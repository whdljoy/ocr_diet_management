<template>
  <v-dialog :value="dialog" content-class="white" :width="1280">
    <div class="px-15 py-15">
      <div class="d-flex flex-column">
        <div class="d-flex mb-5">
          <div class="d-flex w-full justify-center">
            <h2 class="text-h2-medium">{{ today }}</h2>
          </div>
          <v-icon @click="closeDialog">mdi-close-thick</v-icon>
        </div>
      </div>
      <div class="nutrients__container">
        <div class="upload d-flex flex-column">
          <h4 class="text-center text-h4-bold mb-5">오늘의 섭취</h4>
          <div class="d-flex" style="gap: 12px">
            <p-btn class="w-full" theme="secondaryLine" @click="ocrUpload"
              ><v-icon>mdi-plus</v-icon></p-btn
            >
            <p-btn class="w-full" theme="secondaryLine" @click="onSearch"
              ><v-icon>mdi-magnify-plus-outline</v-icon></p-btn
            >
          </div>
          <div class="mt-1 d-flex flex-column justify-center">
            <p-table
              :headers="headers"
              :items="dayDiet"
              grid-template-columns="minmax(100px,1fr) 80px 60px 60px 120px"
            >
              <template v-slot:servingWT="{ item }">
                <p>{{ item.servingWT }} g</p>
              </template>
              <template v-slot:count="{ item }">
                <p v-if="!item.setting">{{ item.count }}</p>
                <p-input v-else type="number" v-model="item.count" dense />
              </template>
              <template v-slot:change="{ item }">
                <div class="d-flex" style="gap: 4px">
                  <p-btn
                    small
                    theme="secondary"
                    v-if="!item.setting"
                    @click="item.setting = true"
                    >수정</p-btn
                  >
                  <p-btn small theme="primary" v-else @click="putDiet(item)"
                    >저장</p-btn
                  >
                  <p-btn small theme="grayLine" @click="deleteDiet(item)"
                    >삭제</p-btn
                  >
                </div>
              </template>
            </p-table>
          </div>
        </div>
        <div class="nutrients__wrapper">
          <div class="item">
            <h3 class="text-center text-h3-bold mb-3">대사량</h3>
            <div
              class="d-flex justify-space-between align-center"
              style="gap: 12px"
            >
              <div class="item__wrapper">
                <p>총 섭취량 : {{ this.totalCalories }} kcal</p>
              </div>
              <div class="item__wrapper">
                <p>기초 대사량 : {{ this.foundation }} kcal</p>
                <p>활동 대사량 : {{ this.activation }} kcal</p>
              </div>
            </div>
          </div>
          <div class="item">
            <h3 class="text-center text-h3-bold mb-3">영양성분</h3>
            <div class="nutrients">
              <div class="target">
                <h5 class="mb-5 text-h5-bold">탄수화물 (50%)</h5>
                <p>현재: {{ this.totalCarbohydrate }}kcal</p>
                <p>목표: {{ this.targetCarbohydrate }}kcal</p>
              </div>
              <div class="target">
                <h5 class="mb-5 text-h5-bold">단백질 (30%)</h5>
                <p>현재: {{ this.totalProtein }} kcal</p>
                <p>목표: {{ this.targetProtein }} kcal</p>
              </div>
              <div class="target">
                <h5 class="mb-5 text-h5-bold">지방 (20%)</h5>
                <p>현재: {{ this.totalFat }} kcal</p>
                <p>목표: {{ this.targetFat }} kcal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <input
      type="file"
      id="ocr_upload"
      style="display: none"
      @change="postOcr"
      accept="image/jpeg, image/png, image/jpg"
    />
    <search
      :dialog="searchDialog"
      @close="searchDialog = false"
      @select="setSearchFood"
    />
  </v-dialog>
</template>

<script>
import Search from "@/components/Search";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { dateFormat } from "@/utils";
import { baseUrl } from "@/config";
export default {
  name: "DayDialog",
  components: {
    Search,
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: new Date(),
    },
  },
  data() {
    return {
      postCount: false,
      searchDialog: false,
      loading: false,
      headers: [
        {
          text: "제품명",
          value: "productName",
        },
        {
          text: "1회 제공량",
          value: "servingWT",
        },
        {
          text: "칼로리",
          value: "eachCalories",
        },
        {
          text: "수량",
          value: "count",
        },
        {
          text: "",
          value: "change",
        },
      ],
      selectedFoods: {},
      savedFoods: [],
    };
  },
  computed: {
    ...mapGetters({
      user: "users/getUser",
      monthCalories: "calendar/getMonthCalories",
      ocrData: "calendar/getOcrData",
      userUuid: "users/getUserUuid",
      dayDiet: "calendar/getDayDiet",
    }),
    today() {
      return dateFormat.getDateFormat(this.date, "yyyy년 MM월 dd일");
    },
    userId() {
      return this.userUuid || localStorage.getItem("userUuid");
    },
    foundation() {
      return parseInt(this.user?.BMR) || 0;
    },
    activation() {
      let calories;
      switch (this.user?.purpose) {
        case "MINUS":
          calories = -500;
          break;
        case "CURRENT":
          calories = 0;
          break;
        case "PLUS":
          calories = 500;
          break;
      }
      return parseInt(this.user?.BMR * this.user?.exercise + calories) || 0;
    },
    targetProtein() {
      return parseInt(this?.activation * 0.3) || 0;
    },
    targetCarbohydrate() {
      return parseInt(this?.activation * 0.5) || 0;
    },
    targetFat() {
      return parseInt(this?.activation * 0.2) || 0;
    },
    totalCalories() {
      const eachDay = this?.monthCalories.filter((item) => {
        return item.day === this.date.getDate();
      });
      return eachDay[0]?.calories || 0;
    },
    totalFat() {
      const eachDay = this?.monthCalories.filter((item) => {
        return item.day === this.date.getDate();
      });
      return eachDay[0]?.fat || 0;
    },
    totalProtein() {
      const eachDay = this?.monthCalories.filter((item) => {
        return item.day === this.date.getDate();
      });
      return eachDay[0]?.protein || 0;
    },
    totalCarbohydrate() {
      const eachDay = this?.monthCalories.filter((item) => {
        return item.day === this.date.getDate();
      });
      return eachDay[0]?.carbohydrate || 0;
    },
  },
  watch: {
    dialog: {
      handler(newVal) {
        if (newVal) {
          this.getDiet();
        }
      },
    },
  },
  methods: {
    ...mapActions({
      reqGetFood: "calendar/reqGetFood",
      reqPostDiet: "calendar/reqPostDiet",
      reqGetDiet: "calendar/reqGetDiet",
      reqDeleteDiet: "calendar/reqDeleteDiet",
      reqPutDiet: "calendar/reqPutDiet",
    }),
    ...mapMutations({
      setOcrData: "calendar/setOcrData",
    }),
    async setSearchFood(item) {
      this.searchDialog = false;
      this.selectedFoods = item;
      await this.postDiet();
      this.getDiet();
    },
    closeDialog() {
      this.$emit("close");
    },
    ocrUpload() {
      document.getElementById("ocr_upload").click();
    },
    async putDiet(item) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      const result = await this.reqPutDiet({
        ...(item.dietUuid && { dietUuid: item.dietUuid }),
        ...(item.count && { count: item.count }),
      });
      this.loading = false;
      if (result) {
        this.postCount = false;
        this.getDiet();
      }
    },
    async deleteDiet(item) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      const result = await this.reqDeleteDiet({
        ...(this.userId && { userUuid: this.userId }),
        ...(item.dietUuid && { dietUuid: item.dietUuid }),
      });
      this.loading = false;
      if (result) {
        this.getDiet();
      }
    },
    async postDiet() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      const result = await this.reqPostDiet({
        ...(this.userId && { userUuid: this.userId }),
        ...(this.selectedFoods.productName && {
          productName: this.selectedFoods.productName,
        }),
        ...(this.selectedFoods.carbohydrate && {
          carbohydrate: this.selectedFoods.carbohydrate,
        }),
        ...(this.selectedFoods.protein && {
          protein: this.selectedFoods.protein,
        }),
        ...(this.selectedFoods.fat && { fat: this.selectedFoods.fat }),
        ...(this.selectedFoods.eachCalories && {
          eachCalories: this.selectedFoods.eachCalories,
        }),
        ...(this.selectedFoods.servingWT && {
          servingWT: this.selectedFoods.servingWT,
        }),
        date: dateFormat.getDateFormat(this.date, "yyyy-MM-dd"),
      });
      this.loading = false;
    },
    async postOcr(e) {
      if (this.loading) {
        return;
      }
      let form = new FormData();
      form.append("image", e.target.files[0]);
      this.loading = true;
      const result = await this.$axios.post(`${baseUrl}/calendar/ocr`, form, {
        header: { "Content-Type": "multipart/form-data" },
      });
      this.loading = false;
      this.setOcrData(result.data);
      console.log(result.data);
    },
    onSearch() {
      this.searchDialog = true;
    },
    async getDiet() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      const result = await this.reqGetDiet({
        ...(this.userId && { userUuid: this.userId }),
        date: dateFormat.getDateFormat(this.date, "yyyy-MM-dd"),
      });
      this.loading = false;
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.nutrients__container {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  .upload {
    background-color: $gray2;
    border-radius: 4px;
    padding: 40px 40px 40px 40px;
  }
  .nutrients__wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    .item {
      background-color: $gray2;
      min-height: 250px;
      border-radius: 4px;
      padding: 40px 40px 40px 40px;
    }
    .item__wrapper {
      background-color: $white;
      border: 2px solid $gray5;
      border-radius: 4px;
      flex-direction: column;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 200px;
      width: 50%;
    }
    .nutrients {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      height: 100%;
      .target {
        background-color: $white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 200px;
        border: 2px solid $gray5;
        border-radius: 4px;
      }
    }
  }
}
</style>
