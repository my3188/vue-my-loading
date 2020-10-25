<template>
  <transition name="v-my-loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="v-my-loading-mask"
      :style="{ backgroundColor: background || '' }"
      :class="[customClass, { 'is-fullscreen': fullscreen }]"
    >
      <div class="v-my-loading-spinner">
        <template v-if="spinner">
          <svg
            v-if="!spinner"
            class="circular"
            viewBox="25 25 50 50"
            :width="c_width"
            :height="c_height"
          >
            <circle
              class="path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              :style="{ stroke: c_color }"
            />
          </svg>
          <i v-else :class="spinner"></i>
        </template>
        <component
          v-else
          :is="loaderType ? loaderType : 'bars'"
          :color="c_color"
          :width="c_width"
          :height="c_height"
        />
        <p v-if="text" class="v-my-loading-text" :style="{ color: c_color }">
          {{ text }}
        </p>
      </div>
    </div>
  </transition>
</template>

<script>
//Loaders中有3种值 spinner  dots  bars
import Loaders from "./loaders";
export default {
  components: Loaders,
  data() {
    return {
      loaderType: "bars",
      color: "#4f8bff",
      height: 80,
      width: 80,
      text: null,
      spinner: null,
      // color: null, //只针对loader
      // width: null, //只针对loader
      // height: null, //只针对loader
      loader: null,
      background: null,
      fullscreen: true,
      visible: false,
      customClass: ""
    };
  },
  computed: {
    c_loaderType() {
      return this.loaderType ? this.loaderType : "bars";
    },
    c_color() {
      return this.color ? this.color : "#4f8bff";
    },
    c_height() {
      return (this.height ? this.height : 80)-0;
    },
    c_width() {
      return (this.width ? this.width : 80)-0;
    }
    /* loaderType() {
      let rs = "bars";
      if (this.loader && this.loader.type) {
        rs = this.loader.type;
      }
      return rs;
    },
    loaderColor() {
      let rs = "#4f8bff";
      if (this.loader && this.loader.color) {
        rs = this.loader.color;
      }
      return rs;
    },
    loaderWidth() {
      let rs = 50;
      if (this.loader && this.loader.width) {
        rs = this.loader.width;
      }
      return rs;
    },
    loaderHeight() {
      let rs = 50;
      if (this.loader && this.loader.height) {
        rs = this.loader.height;
      }
      return rs;
    } */
  },
  methods: {
    handleAfterLeave() {
      this.$emit("after-leave");
    },
    setText(text) {
      this.text = text;
    }
  }
};
</script>
