<template lang="html">
  <div class="border-box">
    <Header />
    <section class="p-container feature__container my-10">
      <div class="d-flex flex-column align-center">
        <p class="top-title-h1">
          일정관리와 식단관리를 <br />
          한번에
        </p>
        <p-btn @click="goToRegister" theme="secondary" class="mt-5 px-5">
          시작하기
        </p-btn>
      </div>
      <img src="@/assets/main.png" class="main-top-image rounded-lg lazy" />
    </section>

    <section
      class="local-padding-y"
      v-for="(feature, index) in features"
      :key="index"
      :style="{ background: feature.bgColor }"
    >
      <div class="p-container d-flex flex-column align-center">
        <div class="d-flex my-10 flex-column align-center">
          <p class="text-main-title" v-html="feature.title"></p>
        </div>
        <div
          class="d-flex flex-column align-lg-center my-10"
          v-for="(item, index) in feature.items"
          :key="index"
          :class="item.reverse ? 'flex-lg-row-reverse' : 'flex-lg-row'"
        >
          <img
            class="image__wrapper"
            src="@/assets/explain1.png"
            v-if="item.image"
          />
          <img class="image__wrapper" src="@/assets/explain2.png" v-else />
          <div
            class="text__wrapper d-flex flex-column align-center align-lg-start justify-lg-center px-lg-15 px-0"
          >
            <p
              class="sub--title text-center text-lg-left mb-5 mb-lg-8"
              v-html="item.subtitle"
            ></p>
            <div v-if="item.isList" class="pr-0 pr-lg-10" style="width: 100%">
              <ul>
                <li
                  v-for="(list, index) in item.lists"
                  :key="index"
                  @click="toggle(list)"
                  class="py-4 w-full cursor-pointer"
                >
                  <p
                    class="d-flex justify-space-between list-title expand-title"
                    :class="{ highlight: list.active }"
                  >
                    {{ list.listTitle
                    }}<v-icon :color="iconColor(list.active)">{{
                      list.active ? "mdi-minus" : "mdi-plus"
                    }}</v-icon>
                  </p>
                  <div style="height: 16px" v-show="list.active">&nbsp;</div>
                  <v-expand-transition>
                    <div
                      v-show="list.active"
                      v-html="list.listContent"
                      class="list-description"
                    ></div>
                  </v-expand-transition>
                </li>
              </ul>
            </div>
            <div v-else class="list-title">
              <p
                class="text-center text-lg-start text-h5-regular"
                v-html="item.description"
              ></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "@/components/Header";
export default {
  name: "featurePage",
  components: {
    Header,
  },
  data() {
    return {
      features: [
        {
          title: `당신만을 위한 영양성분을 확인하고, <br /> 일정을 관리하세요!`,
          bgColor: "#FFFAF2",
          addImage:
            "https://file.poincampus.com/assets/poin-home/feature/img_build_4.png",
          addMobileImage:
            "https://file.poincampus.com/assets/poin-home/feature/mobile.png",
          items: [
            {
              subtitle: `당신의 활동대사량을 확인하고 목적에 맞게 운동량을 조절하세요`,
              image: true,
              reverse: true,
              isList: true,
              lists: [
                {
                  listTitle: "활동 대사랑",
                  listContent: "간단한 정보를 토대로 활동 대사량 알려드립니다.",
                  active: false,
                },
                {
                  listTitle: "영양 성분 분석",
                  listContent:
                    "활동대사량과 운동 목적에 맞게 필요한 영양 성분을 분석하고 제공합니다.",
                  active: false,
                },
              ],
            },
            {
              subtitle: `편리한 기록으로 일정과 건강 모두 챙기세요`,
              image: false,
              isList: true,
              reverse: false,
              lists: [
                {
                  listTitle: "캘린더",
                  listContent: "캘린더 형식으로 일정을 기록하고 확인하세요.",
                  active: false,
                },
                {
                  listTitle: "식단 기록",
                  listContent:
                    "운동량과 식단을 기록하고 섭취가능한 칼로리를 확인하세요. ",
                  active: false,
                },
              ],
            },
          ],
        },
      ],
    };
  },
  computed: {},
  methods: {
    iconColor(active) {
      if (active) {
        return "#f55e42";
      }
      return "black";
    },
    toggle(toggleList) {
      this.features.map((feature) =>
        feature.items.map((item) =>
          item.lists?.map((list) => {
            if (toggleList.listTitle === list.listTitle) {
              list.active = !list.active;
            } else {
              list.active = false;
            }
          })
        )
      );
    },
    goToRegister() {
      this.$router.push({
        name: "login",
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Song+Myung&display=swap");

.feature__container {
  display: flex;
  align-items: center;
  gap: 40px;
  justify-content: center;
}
.top-title {
  font-size: 52px;
  font-weight: bold;
  font-stretch: normal;
  line-height: 1.3;
  letter-spacing: 0;
  @media (max-width: $mdBreakPoint) {
    font-size: 48px;
  }
  @media (max-width: $smBreakPoint) {
    font-size: 32px;
  }
}
.image__wrapper {
  width: 50%;
  @media (max-width: $lgBreakPoint) {
    width: 100%;
    max-width: 480px;
    margin-bottom: 20px;
  }
}
.add-img {
  width: 100%;
  @media (max-width: $lgBreakPoint) {
    max-width: 480px;
  }
}
.text__wrapper {
  width: 50%;
  text-align: start;
  .sub--title {
    font-size: 24px;
    font-weight: bold;
  }
  .list-title {
    font-size: 18px;
    font-weight: 400;
    &.expand-title:hover {
      color: $primary !important;
      ::v-deep {
        .v-icon {
          color: $primary !important;
        }
      }
    }
  }
  @media (max-width: $lgBreakPoint) {
    width: 100%;
    max-width: 480px;
  }
}
.main-top-image {
  width: 52.5%;
  @media (max-width: $lgBreakPoint) {
    width: 100%;
    max-width: 600px;
  }
}
.top-tag {
  font-family: "Song Myung", serif;
  font-size: 52px;
  font-weight: 400;
  font-stretch: normal;
  line-height: 1.3;
  letter-spacing: 0;
  @media (max-width: $lgBreakPoint) {
    font-size: 48px;
  }
  @media (max-width: $lgBreakPoint) {
    font-size: 40px;
  }
}
.text-main-title {
  font-size: 32px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  color: $black;
  @media (max-width: $lgBreakPoint) {
    max-width: 480px;
  }
}
.list-description {
  font-weight: 400;
  font-size: 16px;
  color: $gray7;
  overflow-wrap: normal;
}
.top-title-h1 {
  font-size: 52px;
  font-weight: bold;
  font-stretch: normal;
  line-height: 1.3;
  letter-spacing: 0;
  @media (max-width: $mdBreakPoint) {
    font-size: 48px;
  }
  @media (max-width: $smBreakPoint) {
    font-size: 40px;
  }
}
</style>
