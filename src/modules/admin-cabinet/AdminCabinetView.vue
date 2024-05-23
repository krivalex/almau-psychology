<template>
  <div class="contols-containter">
    <p-tab-view v-model:active-index="selectedTab" scrollable>
      <p-tab-panel v-for="(tab, index) in tabs" :key="index" :header="tab.header">
        <template v-if="isAdmin">
          <template v-if="selectedTab === index">
            <component :is="tab.component" />
          </template>
        </template>
        <template v-else>
          <your-have-no-permission />
        </template>
      </p-tab-panel>
    </p-tab-view>
  </div>
</template>

<script setup lang="ts">
import PTabView from 'primevue/tabview'
import PTabPanel from 'primevue/tabpanel'
import { ref, shallowRef } from 'vue'

import CompletedTestsView from '@/modules/admin-cabinet/completed-tests/CompletedTestsView.vue'
import AllStudentsView from '@/modules/admin-cabinet/students/AllStudentsView.vue'
import TestControlView from '@/modules/admin-cabinet/test-control/TestControlView.vue'

import YourHaveNoPermission from '@/components/YourHaveNoPermission.vue'
import { useUser } from '@/composables/useUser'

const { isAdmin } = useUser()

const selectedTab = ref(0)
const tabs = ref([
  { header: 'Пройденные тесты', component: shallowRef(CompletedTestsView) },
  { header: 'Управление тестами', component: shallowRef(TestControlView) },
  { header: 'Студенты', component: shallowRef(AllStudentsView) },
])
</script>

<style lang="scss" scoped>
:deep(.p-tabview-panels) {
  padding: 0;
}
</style>
