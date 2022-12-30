<template>
  <v-select
    class="poin-select"
    :items="options"
    :value="value"
    :dense="dense"
    :placeholder="placeholder"
    :menu-props="{
      bottom: true,
      offsetY: true,
      contentClass: 'p-select-options',
    }"
    @change="updateInput"
    :clearable="clearable"
    hide-details
    single-line
    outlined
    color="gray darken-1"
    :background-color="readonly ? 'gray lighten-3' : backgroundColor"
    :readonly="readonly"
    :disabled="disabled"
    item-color="black"
    ref="select"
    :no-data-text="noDataText"
  >
    <template v-slot:selection="data">
      <div class="text-body-2-regular black--text single-line">
        {{ data.item.text }}
      </div>
    </template>
    <template v-slot:item="data">
      <p
        v-if="!textOption(data).hoverOn"
        v-html="textOption(data).text"
        :style="`width: ${textOption(data).width} !important`"
        :class="textOption(data).class"
        class="text-body-2-regular black--text"
      />
      <v-tooltip v-else content-class="pa-3 ml-3" right color="black">
        <template v-slot:activator="{ on }">
          <p
            v-on="on"
            v-html="textOption(data).text"
            :style="`width: ${textOption(data).width} !important`"
            :class="textOption(data).class"
            class="text-body-2-regular black--text"
          />
        </template>
        <p class="text-body-2-regular">
          {{ textOption(data).text }}
        </p>
      </v-tooltip>
    </template>
    <template v-slot:append>
      <div class="d-flex align-center">
        <p-icon icon="DownSm/Gray8" />
      </div>
    </template>
  </v-select>
</template>

<script>
import { mapGetters } from "vuex";
// options: [
//   {
//     text: "",  // 화면에서 보여지는 TEXT 값
//     value: "", // 데이터로 저장되는 실제 VALUE
//   }
// ]
export default {
  name: "PoinUiSelect",
  props: {
    value: {
      type: [String, Number, Boolean],
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
    noDataText: {
      type: String,
      default: "데이터가 없습니다.",
    },
    placeholder: {
      type: String,
      default: "카테고리를 선택해주세요.",
    },
    dense: {
      type: Boolean,
      default: false,
    },
    backgroundColor: {
      type: String,
      default: "white",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      default: () => [],
    },
    width: {
      type: [Number, String],
      default: "170px",
    },
  },
  computed: {
    ...mapGetters({
      isMobile: "common/isMobile",
    }),
  },
  methods: {
    textOption(data) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const textWidth = context.measureText(data.item.text).width + 14; //+14 -> padding-x

      let result = {
        text: data.item.text,
        width: "100%",
      };

      if (!this.isMobile && textWidth > this.width) {
        return {
          ...result,
          width: `${this.width - 28}px `,
          class: "single-line",
          hoverOn: true,
        };
      }
      return result;
    },
    updateInput(val) {
      this.$emit("input", val);
    },
    onClear() {
      this.$emit("input", "");
      this.$emit("click:clear");
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .v-input {
    * {
      &:active,
      &:focus,
      &:focus-visible {
        outline: unset !important;
      }
      font-size: 14px;
      color: $black;
    }
  }
  .v-input__append-inner {
    margin-top: 0 !important;
    align-self: center;
  }
  .v-select__slot {
    display: flex;
    align-items: center;
    min-height: 40px;
  }
  .v-select__selections input {
    &::placeholder {
      color: $gray6;
      font-size: 14px;
    }
  }
  fieldset {
    border-color: $gray3;
    outline: none;
  }
  .v-select__selection--comma {
    all: unset;
    box-sizing: border-box;
  }
  .v-input__icon--clear {
    width: 20px;
    min-width: 20px !important;
    height: 20px;
  }
  .v-icon__component {
    width: 20px;
    height: 20px;
  }
}
.v-select--is-menu-active .v-input__append-inner i {
  transform: rotate(180deg);
}
</style>

<style lang="scss">
.p-select-options {
  * {
    box-sizing: border-box;
  }
  box-sizing: border-box;
  border: 1px solid $gray3;
  box-shadow: unset;
  .v-select-list {
    padding: 12px 0;
  }
  .v-list-item {
    min-height: 40px;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    padding: 0 12px;
    &:hover {
      background-color: $gray1;
    }
    &::before {
      all: unset;
      box-sizing: border-box;
    }
    .v-list-item__title {
      color: $black;
      font-size: 14px;
    }
  }
}
</style>
