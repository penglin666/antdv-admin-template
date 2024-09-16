<template>

	<a-tabs v-model:activeKey="tag.activeKey" type="editable-card" size="small"
		@edit="(key) => tagStore.edit(key, 'closeCurrent')" hideAdd @change="(path) => router.push(path)" :tabBarGutter="6">
		<a-tab-pane v-for="item in tag.items" :key="item.key" :tab="item.label" :closable="item.closable">
		</a-tab-pane>
		<template #rightExtra>
			<a-space-compact block>
				<a-tooltip title="刷新" placement="bottom">
					<a-button :icon="h(ReloadOutlined)" @click="router.go(0)" />
				</a-tooltip>
				<a-dropdown placement="bottomRight">
					<a-button :icon="h(EllipsisOutlined)" />
					<template #overlay>
						<a-menu @click="({ key }) => tagStore.edit(route.fullPath, key, router)" :items="[
							{
								key: 'closeCurrent',
								label: '关闭当前',
								icon: h(CloseOutlined),
							},
							{
								key: 'closeLeft',
								label: '关闭左侧',
								icon: h(ArrowLeftOutlined)
							},
							{
								key: 'closeRight',
								label: '关闭右侧',
								icon: h(ArrowRightOutlined)
							},
							{
								key: 'closeOther',
								label: '关闭其它',
								icon: h(MinusCircleOutlined)
							},
							{
								key: 'closeAll',
								label: '关闭全部',
								icon: h(CloseCircleOutlined)
							}
						]" />
					</template>
				</a-dropdown>
			</a-space-compact>
		</template>
	</a-tabs>
</template>
<script setup>
import { h } from 'vue'
import { useTagStore } from "@/stores/modules/tag";
import {
	EllipsisOutlined,
	ReloadOutlined,
	ArrowLeftOutlined,
	ArrowRightOutlined,
	CloseOutlined,
	MinusCircleOutlined,
	CloseCircleOutlined
} from "@ant-design/icons-vue";
const tagStore = useTagStore();
const tag = computed(() => tagStore.tag);
const route = useRoute();
const router = useRouter();
</script>
<style scoped lang="scss">
::v-deep(.ant-tabs-nav) {
	margin-bottom: 0;
	padding: 4px 0;

	.ant-tabs-tab {
		border-radius: 0px !important;
		border: 1px solid transparent;
		box-sizing: border-box;
		background-color: #fff;

		&:first-child {
			border-left: 0 !important;
		}
	}

	.ant-tabs-tab-active {
		border: 1px solid #1677ff !important;
	}

	.ant-tabs-tab-remove {
		line-height: normal;
		width: 16px;
		height: 16px;
		border-radius: 50%;

		&:hover {
			background-color: #ff4d4f;
			color: #fff;
		}
	}
}
</style>
