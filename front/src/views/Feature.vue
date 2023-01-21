<template>
  <div class="border-box">
    <section
      class="p-container local-padding-y d-flex flex-column flex-lg-row align-center justify-center justify-lg-space-between text-center text-lg-left"
    >
      <div>
        <p class="top-title-h1">
          당신의 성공여정에<br />
          필요한 모든 기능을<br />
          담았습니다
        </p>
        <button
          class="mt-6 mt-lg-10 rounded-lg py-4 px-8 register-top-btn"
          @click.stop="goToRegister"
        >
          무료로 시작하기
        </button>
      </div>
      <!-- <img
        src="https://file.poincampus.com/assets/poin-home/feature/img_fun_1.png"
        class="main-top-image lazy mt-10 mt-lg-0"
      /> -->
    </section>

    <section
      class="local-padding-y"
      v-for="(feature, index) in features"
      :key="index"
      :style="{ background: feature.bgColor }"
    >
      <div class="p-container d-flex flex-column align-center">
        <div class="d-flex mb-10 flex-column align-center">
          <p class="top-tag mb-5 mb-lg-10" :style="{ color: feature.tagColor }">
            {{ feature.tag }}
          </p>
          <p
            class="text-main-title"
            v-html="isMobile ? feature.mbTitle : feature.title"
          ></p>
        </div>
        <div
          class="d-flex flex-column align-lg-center my-10"
          v-for="(item, index) in feature.items"
          :key="index"
          :class="item.reverse ? 'flex-lg-row-reverse' : 'flex-lg-row'"
        >
          <img class="image__wrapper" :src="item.image" />
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
        <div
          v-if="feature.tag === 'Build'"
          class="d-flex flex-column justify-center align-center"
        >
          <img
            class="add-img"
            :src="isMobile ? feature.addMobileImage : feature.addImage"
          />
          <button
            class="mt-5 mt-lg-10 rounded-lg py-4 px-8 register-top-btn"
            @click.stop="goToRegister"
          >
            무료로 시작하기
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "featurePage",

  data() {
    return {
      features: [
        {
          tag: "Build",
          mbTitle: `당신만의 브랜드를 <br/> 구축하고, <br /> 콘텐츠 판매를 시작하세요!`,
          title: `당신만의 브랜드를 구축하고, <br /> 콘텐츠 판매를 시작하세요!`,
          tagColor: "#EFAD2A",
          bgColor: "#FFFAF2",
          addImage:
            "https://file.poincampus.com/assets/poin-home/feature/img_build_4.png",
          addMobileImage:
            "https://file.poincampus.com/assets/poin-home/feature/mobile.png",
          items: [
            {
              subtitle: `10분만에<br />당신의 웹사이트를 개설하세요`,
              image:
                "https://file.poincampus.com/assets/poin-home/feature/img_build_1.png",
              reverse: true,
              isList: true,
              lists: [
                {
                  listTitle: "반응형 웹사이트",
                  listContent:
                    "PC, 모바일 어느 환경에서도 접속할 수 있는 반응형 웹사이트를 만들 수 있습니다.",
                  active: false,
                },
                {
                  listTitle: "바로가기 앱",
                  listContent:
                    "클릭 한 번으로 PC, 모바일 캠퍼스 앱이 생성됩니다.",
                  active: false,
                },
                {
                  listTitle: "자체 도메인 설정",
                  listContent:
                    "신뢰감을 높일 수 있는 도메인을 설정하고 많은 사람들에게 공유해 보세요.",
                  active: false,
                },
                {
                  listTitle: "소개 페이지, 배너 디자인, 로고",
                  listContent:
                    "소개 페이지와 배너 디자인, 로고로 멋지게 나만의 웹사이트를 꾸며 보세요.",
                  active: false,
                },
              ],
            },
            {
              subtitle: `당신이 원하는 방식으로<br />콘텐츠를 구성하세요`,
              image:
                "https://file.poincampus.com/assets/poin-home/feature/img_build_2-1.png",
              isList: true,
              reverse: false,
              lists: [
                {
                  listTitle: "동영상,  오디오",
                  listContent:
                    "동영상과 학습자료, 외부동영상으로 강의를 구성할 수 있습니다.",
                  active: false,
                },
                {
                  listTitle: "웨비나",
                  listContent:
                    "실시간으로 1:1 컨설팅, 웨비나를 운영할 수 있습니다.",
                  active: false,
                },
                {
                  listTitle: "전자책, 이미지, 칼럼",
                  listContent:
                    "뷰어(viewer)와 첨부파일 형식으로 전자책과 칼럼을 구성할 수 있습니다.",
                  active: false,
                },
              ],
            },
            {
              subtitle: `많은 사람에게 웹사이트를 알리고<br />커뮤니티를 구성하세요`,
              image:
                "https://file.poincampus.com/assets/poin-home/feature/img_build_3-1.png",
              reverse: true,
              isList: true,
              lists: [
                {
                  listTitle: "검색최적화 (SEO)",
                  listContent:
                    "검색최적화를 통해 포털사이트에서 당신의 웹사이트가 노출이 잘 되도록 할 수 있습니다.",
                  active: false,
                },
                {
                  listTitle: "프로덕트별 커뮤니티",
                  listContent:
                    "프로덕트, 그룹별로 커뮤니티를 구성해서 소통해 보세요.",
                  active: false,
                },
                {
                  listTitle: "공지사항 알림",
                  listContent:
                    "중요한 공지사항은 알림 ( 메일, PUSH, 카톡 )을 통해서 확인할 수 있습니다.",
                  active: false,
                },
              ],
            },
          ],
        },
        {
          tag: "Grow",
          mbTitle:
            "다양한 도구로<br/>인사이트를 얻고,<br/>더 큰 수익을 창출하세요!",
          title: "다양한 도구로 인사이트를 얻고, 더 큰 수익을 창출하세요!",
          tagColor: "#EF7C2A",
          bgColor: "#FFFFFF",
          items: [
            {
              subtitle: "관리는 더 적게, 수익은 더 많이",
              image:
                "https://file.poincampus.com/assets/poin-home/feature/img_grow_1-1.png",
              reverse: false,
              isList: true,
              lists: [
                {
                  listTitle: "결제시스템 자동 연동",
                  listContent:
                    "번거로움 없이 결제 시스템을 자동으로 연동하여 사용할 수 있습니다.",
                  active: false,
                },
                {
                  listTitle: "매출 통계 분석",
                  listContent:
                    "대시보드를 통해 매출을 한눈에 파악하고 내야하는 세금 내역까지 다운로드 받을 수 있습니다.",
                  active: false,
                },
                {
                  listTitle: "프로모션",
                  listContent:
                    "다양한 프로모션으로 프로덕트 판매를 촉진시키세요.",
                  active: false,
                },
              ],
            },
            {
              subtitle: "더 많은 인사이트를 얻으세요",
              image:
                "https://file.poincampus.com/assets/poin-home/feature/img_grow_2.png",
              reverse: false,
              isList: true,
              lists: [
                {
                  listTitle: "회원 활동 분석",
                  listContent:
                    "각 회원들마다 프로덕트에 잘 참여하고 있는지, 인기가 많은 프로덕트가 무엇인지 확인하고 계속해서 개선해 나가세요.",
                  active: false,
                },
              ],
            },
          ],
        },
        {
          tag: "Scale Up",
          mbTitle:
            "여러분의 성공에는<br/>제한이 없습니다<br/>계속해서 달려나가세요!",
          title: "여러분의 성공에는 제한이 없습니다<br/>계속해서 달려나가세요!",
          tagColor: "#EF4B2A",
          bgColor: "#FFF6F4",
          items: [
            {
              reverse: false,
              subtitle: `비즈니스를 확장하고<br />여러 명이서 더욱 편리하게 관리하세요`,
              image:
                "https://file.poincampus.com/assets/poin-home/feature/img_scaleup_1.png",
              isList: false,
              description: `나만의 웹사이트가 성장했다면,<br />직원을 초대하여 함께 비즈니스를 확장해 보세요.`,
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      isMobile: "common/isMobile",
    }),
  },
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
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Song+Myung&display=swap");

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
</style>
