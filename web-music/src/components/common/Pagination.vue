<template>
	<!-- 分页器 -->
	<div class="page">
		<el-pagination v-show="total > pageSize" background :page-size="pageSize" :layout="layout" :total="total" :current-page="currentPage" @current-change="handleCurrentChange"> </el-pagination>
	</div>
</template>

<script>
export default {
	name: "Pagination",
	props: {
        //总条目数
		total: {
			required: true,
			type: Number,
		},
        //每页显示个数选择器的选项设置
		pageSize: {
			required: true,
			type: Number,
		},
        //当前页数
		currentPage: {
			type: Number,
			default: 1,
		},
        //是否在顶部
		scrollTop: {
			type: Boolean,
			default: true,
		},
        //组件布局
		layout: {
			type: String,
			default: "total, prev, pager, next",
		},
	},
	methods: {
		handleCurrentChange(page) {
            // console.log(page);
			this.$emit("handleCurrentChange", page);
			if (this.scrollTop) {
				// 返回顶部
				let view = document.querySelector(".view");
				view.scrollTop = 0;
			}
		},
	},
};
</script>

<style lang="less" scoped></style>
