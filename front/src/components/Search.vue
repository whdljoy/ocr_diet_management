<template>
  <v-dialog :value="dialog" content-class="white" :width="960">
    <div class="px-10 py-15">
      <div class="d-flex mb-5">
        <div class="d-flex w-full justify-space-between align-center mb-3">
          <h5 class="text-h5-bold">식품 검색</h5>
          <v-icon @click="closeDialog">mdi-close-thick</v-icon>
        </div>
      </div>
      <p-input
        v-model="search"
        class="mb-5"
        placeholder="식품을 검색해보세요"
        @keyup:enter="searchFood"
        :loading="loading"
      >
        <template v-slot:append>
          <v-icon class="cursor-pointer" @click="searchFood"
            >mdi-magnify</v-icon
          >
        </template>
      </p-input>
      <p-table
        style="min-height: 480px"
        :headers="headers"
        :items="searchedFood"
        :loading="loading"
        empty-msg="검색된 식품이 없습니다."
        grid-template-columns="48px minmax(240px,1fr) 120px 80px  120px 120px"
      >
        <template v-slot:selected="{ item }">
          <p-btn small theme="grayLine" @click="selectFood(item)">선택</p-btn>
        </template>
        <template v-slot:serving="{ item }">
          <p>{{ item.serving }} g</p>
        </template>
      </p-table>
    </div>
  </v-dialog>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import axios from "axios";
import { foodUrl } from "@/config";
export default {
  name: "searchDialog",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      search: "",
      headers: [
        {
          text: "No.",
          value: "index",
        },
        {
          text: "제품명",
          value: "productName",
        },
        {
          text: "제조사",
          value: "production",
        },
        {
          text: "구축년도",
          value: "begin",
        },
        {
          text: "1회 제공량",
          value: "servingWT",
        },
        {
          text: "선택",
          value: "selected",
        },
      ],
    };
  },
  watch: {
    dialog: {
      handler(newVal) {
        if (newVal) {
          this.reqClearFood();
          this.search = "";
        }
      },
    },
  },
  computed: {
    ...mapGetters({
      food: "external/getFood",
    }),
    searchedFood() {
      return this.food?.map((e, index) => {
        return {
          index: index + 1,
          production: e.ANIMAL_PLANT || "-",
          productName: e.DESC_KOR,
          begin: e.BGN_YEAR,
          servingWT: e.SERVING_WT,
          eachCalories: e.NUTR_CONT1,
          carbohydrate: e.NUTR_CONT2,
          protein: e.NUTR_CONT3,
          fat: e.NUTR_CONT4,
          sugar: e.NUTR_CONT5,
          salt: e.NUTR_CONT6,
          count: 1,
        };
      });
    },
  },
  methods: {
    ...mapMutations({
      reqSetFood: "external/setFood",
      reqClearFood: "external/clearFood",
    }),
    selectFood(item) {
      this.$emit("select", item);
    },
    closeDialog() {
      this.$emit("close");
    },
    async searchFood() {
      const ServiceKey =
        "QFeP9T2y7IwQVOXzh10cGjDSiGgOZuoCrvtzYzZyBoET4fWgQL9TpCI9r8nRlV7RhxEz5PMVuqS9RcznwGIAqg%3D%3D";
      if (this.loading) {
        return;
      }
      this.reqClearFood();
      this.loading = true;
      const result = await this.$axios.get(
        `${foodUrl}?ServiceKey=${ServiceKey}&type=json&desc_kor=${this.search}&numOfRows=10`
      );
      this.loading = false;
      this.reqSetFood(result?.data.body?.items);
    },
  },
};
</script>

<style lang="scss" scoped></style>
