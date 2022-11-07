<template>
  <div
    :class="[
      'flex ai-center',
      layoutSetting.layout.value == '1' ? 'jc-between' : 'jc-end',
    ]"
    height="100%"
  >
    <!--        <LayoutHeaderSearch v-if="layoutSetting.layout.value=='0'"/>-->
    <LayoutHeaderLeft v-if="layoutSetting.layout.value == '1'" />
    <!--        <div :class="['flex',layoutSetting.layout.value=='1'?'jc-between':'jc-end']">-->
    <div class="flex jc-end">
      <!--            <LayoutHeaderSearch v-if="layoutSetting.layout.value=='1'" class="mr-42 mt-4" />-->
      <LayoutHeaderRight v-bind="$attrs" v-on="$listeners" />
    </div>
  </div>
</template>

<script>
import LayoutHeaderRight from "./LayoutHeaderRight";
import LayoutHeaderLeft from "./LayoutHeaderLeft";
// import LayoutHeaderSearch from "./LayoutHeaderSearch";
import { mapGetters } from "vuex";

export default {
  name: "index",
  computed: {
    ...mapGetters(["layoutSetting"])
  },
  components: {
    LayoutHeaderRight,
    LayoutHeaderLeft
    // LayoutHeaderSearch,
  }
};
</script>
