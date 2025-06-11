<script setup lang="ts">

import {ref} from "vue";
import {VueDraggableNext} from "vue-draggable-next";

const list1 = ref([
  { name: "John",
    id: 1,
    options: [
      {
        name: 'Leonardo DiCaprio',
        src: 'https://www.morganstanley.com/content/dam/msdotcom/people/tiles/isaiah-dwuma.jpg.img.490.medium.jpg/1594668408164.jpg'
      },
      {
        name: 'Jennifer Lawrence',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        name: 'Audrey Hepburn',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      },
      {
        name: 'Anne Hathaway',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        name: 'Taylor Swift',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      }
    ]
  },
  {
    name: "Joao",
    id: 2,
    options: [
      {
        name: 'Leonardo DiCaprio',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      },
      {
        name: 'Jennifer Lawrence',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        name: 'Audrey Hepburn',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      },
      {
        name: 'Anne Hathaway',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        name: 'Taylor Swift',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      }
    ]
  },
  {
    name: "Jean",
    id: 3,
    options: [
      {
        name: 'Leonardo DiCaprio',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      },
      {
        name: 'Jennifer Lawrence',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        name: 'Audrey Hepburn',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      },
      {
        name: 'Anne Hathaway',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        name: 'Taylor Swift',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      }
    ]
  },
  {
    name: "Gerard",
    id: 4,
    options: [
      {
        name: 'Leonardo DiCaprio',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      },
      {
        name: 'Jennifer Lawrence',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        name: 'Audrey Hepburn',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      },
      {
        name: 'Anne Hathaway',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        name: 'Taylor Swift',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      }
    ]
  },
  {
    name: "Iskandar",
    id: 5,
    options: [
      {
        name: 'Leonardo DiCaprio',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      },
      {
        name: 'Jennifer Lawrence',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        name: 'Audrey Hepburn',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      },
      {
        name: 'Anne Hathaway',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        name: 'Taylor Swift',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      }
    ]
  }
])

const list2 = ref([
  {
    name: "Juan",
    id: 5,
    options: [
      {
        name: 'Leonardo DiCaprio',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      },
      {
        name: 'Jennifer Lawrence',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        name: 'Audrey Hepburn',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      },
      {
        name: 'Anne Hathaway',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        name: 'Taylor Swift',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      }
    ]
  },
  {
    name: "Edgard",
    id: 6,
    options: [
      {
        name: 'Leonardo DiCaprio',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      },
      {
        name: 'Jennifer Lawrence',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        name: 'Audrey Hepburn',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      },
      {
        name: 'Anne Hathaway',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        name: 'Taylor Swift',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      }
    ]
  },
  {
    name: "Johnson",
    id: 7,
    options: [
      {
        name: 'Leonardo DiCaprio',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      },
      {
        name: 'Jennifer Lawrence',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        name: 'Audrey Hepburn',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      },
      {
        name: 'Anne Hathaway',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        name: 'Taylor Swift',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      }
    ]
  }
])

const log = (evt: object) =>  {
  window.console.log(evt);
}

function createDropdownOptions(options: Array<{ name: string, src: string }>) {
  return options.map(option => ({
    key: option.name,
    label: option.name
  }))
}

</script>

<template>
  <div class="row flex justify-center">
    <div class="w-[500px]">
      <n-card class="col-3 card-custom">
        <n-h3 class="font-black">Draggable 1</n-h3>
        <VueDraggableNext
            v-model="list1"
            :list="list1"
            :data-id="1"
            @change="log"
            group="tableColumns"
            style="min-height: 560px"
        >
          <n-list
              v-for="item in list1"
              :key="item.id"
              hoverable
              clickable
              bordered
              class="list-item-custom"
          >
            <n-list-item>
              <n-thing>
                <n-h4>
                  {{ item.name }} {{ item.id }}
                </n-h4>
                <n-avatar-group :options="item.options" :size="30" :max="3">
                  <template #avatar="{ option: { name, src } }">
                    <n-tooltip>
                      <template #trigger>
                        <n-avatar :src="src" />
                      </template>
                      {{ name }}
                    </n-tooltip>
                  </template>
                  <template #rest="{ options: restOptions, rest }">
                    <n-dropdown :options="createDropdownOptions(restOptions)" placement="top">
                      <n-avatar>+{{ rest }}</n-avatar>
                    </n-dropdown>
                  </template>
                </n-avatar-group>
              </n-thing>
            </n-list-item>
          </n-list>
        </VueDraggableNext>
      </n-card>
    </div>

    <div class="w-[500px]">
      <n-card class="col-3 card-custom">
        <n-h3>Draggable 2</n-h3>
        <VueDraggableNext
            v-model="list2"
            :list="list2"
            :data-id="1"
            @change="log"
            group="tableColumns"
            style="min-height: 560px"
        >
          <n-list
              v-for="item in list2"
              :key="item.id"
              hoverable
              clickable
              bordered
              class="list-item-custom"
          >
            <n-list-item>
              <n-thing>
                <n-h4>
                  {{ item.name }} {{ item.id }}
                </n-h4>
                <n-avatar-group :options="item.options" :size="30" :max="3">
                  <template #avatar="{ option: { name, src } }">
                    <n-tooltip>
                      <template #trigger>
                        <n-avatar :src="src" />
                      </template>
                      {{ name }}
                    </n-tooltip>
                  </template>
                  <template #rest="{ options: restOptions, rest }">
                    <n-dropdown :options="createDropdownOptions(restOptions)" placement="top">
                      <n-avatar>+{{ rest }}</n-avatar>
                    </n-dropdown>
                  </template>
                </n-avatar-group>
              </n-thing>
            </n-list-item>
          </n-list>
        </VueDraggableNext>
      </n-card>
    </div>
  </div>
</template>

<style scoped>

.card-custom {
  border-radius: 10px !important;
}

.card-custom :deep(.n-card) {
  border-radius: 10px !important;
}

.list-item-custom {
  margin-bottom: 1rem !important;
  border-radius: 10px !important;
}

.list-item-custom :deep(.n-list) {
  border-radius: 10px !important;
  overflow: hidden;
}

.list-item-custom :deep(.n-list-item) {
  border-radius: 10px !important;
}

/* Additional Tailwind-like spacing */
.row {
  gap: 1rem;
  padding: 1rem;
}
</style>