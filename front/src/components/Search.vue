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
        grid-template-columns="48px minmax(240px,1fr) 120px 80px 80px 80px 120px"
      ></p-table>
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
          text: "수량",
          value: "count",
        },
        {
          text: "선택",
          value: "selected",
        },
        {
          text: "1회 제공량",
          value: "serving",
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
          production: e.ANIMAL_PLANT,
          productName: e.DESC_KOR,
          begin: e.BGN_YEAR,
          serving: e.SERVING_WT,
          kcal: e.NUTR_CONT1,
          cb: e.NUTR_CONT2,
          protein: e.NUTR_CONT3,
          fat: e.NUTR_CONT4,
          sugar: e.NUTR_CONT5,
          salt: e.NUTR_CONT6,
        };
      });
    },
  },
  methods: {
    ...mapMutations({
      reqSetFood: "external/setFood",
      reqClearFood: "external/clearFood",
    }),
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
      console.log(result);
      console.log(result.data.body?.items);
      this.reqSetFood(result?.data.body?.items);
      console.log(this.food);
    },
  },
};
</script>

<style lang="scss" scoped></style>
