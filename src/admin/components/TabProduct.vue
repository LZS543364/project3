<template>
	<div class="table-wrapper">
		<el-form :inline="true" class="form">
			<el-form-item label="商品名称:">
				<el-input placeholder="请输入商品名称"  prefix-icon="el-icon-search" v-model="search.name"></el-input>
			</el-form-item>
			<el-form-item label="商品类别：">
				<el-select v-model="search.mId">
					<el-option label="请选择" :value="0"></el-option>
					<el-option v-for="item in mainList" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
				&nbsp;-&nbsp;
				<el-select v-model="search.sId" :disabled="searchSId">
					<el-option label="请选择" :value="0"></el-option>
					<el-option v-for="item in subList" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button @click="searchHandler">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="list" border class="table">
			<el-table-column type="index" width="50" align="center"  fixed="left"></el-table-column>
			<el-table-column prop="name" label="商品名称" width="150" fixed="left" :show-overflow-tooltip="true"></el-table-column>
			<el-table-column label="价格(RMB)" width="100" align="center">
				<template slot-scope="{ row, column, $index }">
					￥<span v-text="row.price"></span>
				</template>
			</el-table-column>
			<el-table-column prop="remark" label="商品备注" width="300" :show-overflow-tooltip="true"></el-table-column>
			<el-table-column label="商品分类" width="150px">
				<template slot-scope="{ row, column, $index }">
					<span v-text="row.mainCategoryName"></span>- <span v-text="row.subCategoryName"></span>
				</template>
			</el-table-column>
			<el-table-column label="avatar" width="80" align="center" fixed="right">
				<template slot-scope="{ row, column, $index }">
					<el-popover placement="left" :title="`avatar - ${ row.name }`" width="200" trigger="hover">
						<el-image :src="row.avatar"></el-image>
						<el-button slot="reference" icon="el-icon-picture" type="text"></el-button>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column label="banner" width="80" align="center" fixed="right">
				<template slot-scope="{ row, column, $index }">
					<el-button type="text" @click="beginBannerEdit(row)">
						<i class="el-icon-picture"></i>/<i class="el-icon-edit"></i>
					</el-button>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="130" align="center" fixed="right">
				<template slot-scope="{ row, column, $index }">
					<el-button type="text" size="mini" icon="el-icon-edit" @click="beginEdit(row, false)">修改</el-button>
					<el-button type="text" size="mini" icon="el-icon-delete" @click=" removeProduct2(row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="fen" background layout="prev,pager,next,total,sizes"
			:total="pagination.total"
			:page-sizes="[2,4,5,6,8,10]"
			:page-size="pagination.pageSize"
			:current-pade="pagination.currentPage"
			@size-change="pageSize => { pagination.pageSize = pageSize; getData2(1); }"
			@current-change="getData2"></el-pagination>
		<el-button  size="mini" icon="el-icon-plus" @click="beginEdit({}, true)">新增</el-button>
		<el-dialog :visible="edit.isEdit" :show-close="false" width="750px">
			<h3 slot="title">商品信息管理 - {{ edit.isAdd ? '新增' : '修改 '}}</h3>
			<div slot="footer">
				<el-button @click="edit.isEdit = false">取消</el-button>
				<el-button @click="productEdit" type="primary">确定</el-button>
			</div>
			<el-form class="el-form" ref="form" label-width="80px" :model="edit.model" :rules="edit.rules" status-icon>
				<el-form-item label="一级分类">
					<el-select v-model="edit.model.mId" >     <!--select的value等于哪个option的value就显示哪一个option-->
						<el-option label="请选择" v-show="edit.isAdd" :value="0"></el-option>
						<el-option v-for="item in mainList" :key="item.id"
						           :label="item.name"
						           :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="二级分类" >
					<el-select v-model="edit.model.sId"  :disabled="searchSId" >     <!--select的value等于哪个option的value就显示哪一个option-->
						<el-option label="请选择" v-show="edit.isAdd" :value="0"></el-option>
						<el-option v-for="item in subList2" :key="item.id"
						           :label="item.name"
						           :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品名称" prop="name">
					<el-input v-model="edit.model.name" placeholder="请输入分类名称"></el-input>
				</el-form-item>
				<el-form-item label="商品价格" prop="price">
					<el-input v-model.number="edit.model.price" placeholder="请输入商品价格"></el-input>
				</el-form-item>
				<el-form-item label="商品介绍" prop="remark">
					<el-input v-model="edit.model.remark" placeholder="请输入商品介绍"></el-input>
				</el-form-item>
				<el-form-item label="缩略图片" class="category-picture">
					<el-image class='old-avatar' v-show="!edit.isAdd" :src="edit.model.oldAvatar"></el-image>
					<el-upload class="product-uploader"
					           action="/product/upload"
					           name="avatar"
					           accept=".jpg, .png"
					           list-type="picture-card"
					           :file-list="edit.fileList"
					           :on-remove="removeFile"
					           :on-success="uploadSuccess">
						<i class="el-icon-plus avatar-uploader-icon"></i>
						<div slot="tip">只能上传jpg | png图片，大小不超过500KB</div>
					</el-upload>
				</el-form-item>
			</el-form>
		</el-dialog>

		<!--<el-dialog :visible="products.isEdit" title="新增商品"  width="700px" :before-close="endAdd" >-->
			<!--<el-form ref="form">-->
				<!--<el-form-item label="一级分类"  prop="region">-->
					<!--<el-select v-model="products.module.mId" >-->
						<!--<el-option label="请选择" :value="0" :key="0"></el-option>-->
						<!--<el-option v-for="item in mainList" :label="item.name" :value="item.id" :key="item.id"></el-option>-->
					<!--</el-select>-->
				<!--</el-form-item>-->
				<!--<el-form-item label="二级分类"  prop="region">-->
					<!--<el-select v-model="products.module.sId">-->
						<!--<el-option label="请选择" :value="0" :key="0"></el-option>-->
						<!--<el-option v-for="item in subList2" :label="item.name" :value="item.id" :key="item.id"></el-option>-->
					<!--</el-select>-->
				<!--</el-form-item>-->
				<!--<el-form-item label="商品名称" prop="region">-->
					<!--<el-input v-model="products.module.name" label="请输入名称" :key="0"></el-input>-->
				<!--</el-form-item>-->
				<!--<el-form-item label="商品价格" prop="region">-->
					<!--<el-input v-model="products.module.price" label="请输入价格" :key="0"></el-input>-->
				<!--</el-form-item>-->
				<!--<el-form-item label="商品备注" prop="region">-->
					<!--<el-input v-model="products.module.remark" label="请输入备注" :key="0"></el-input>-->
				<!--</el-form-item>-->
				<!--<el-form-item label="图片" prop="region">-->
					<!--<el-upload :on-success="uploadSuccess" list-type="picture-card" name="avatar" accept=".jpg,.png,.jpeg" action="/product/upload"></el-upload>-->
				<!--</el-form-item>-->
				<!--<el-form-item>-->
					<!--<el-button type="primary" @click="sure">确认</el-button>-->
				<!--</el-form-item>-->
			<!--</el-form>-->
		<!--</el-dialog>-->
		<el-dialog :visible="banner.isEdit" title="banner维护" width="700px" :before-close="endBannerEdit">
			<el-upload
				:on-success="bannerUploadSuccessHandler"
				:data="{ id: banner.id }"
				:file-list="banner.list"
				list-type="picture-card"
				action="/product/banner/upload"
				name="banner"
				multiple
				accept=".jpg,.png,.jpeg"
				:before-remove="bannerBeforeRemoveHandler"></el-upload>
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
	import { mapState, mapActions,mapMutations } from "vuex";

        export default {
                data() {
                        let checkPrice = (rule, value, callback) => {
                                if (!value) {
                                        return callback(new Error('价格不能为空'));
                                }
                                setTimeout(() => {
                                        if (!Number.isInteger(parseInt(value))) {
                                                callback(new Error('请输入数字值'));
                                        } else {callback();}
                                }, 1000);
                        };
                        return {
                                searchSId: false,
                                search: { name: "", mId: 0, sId: 0 },
	                        ajaxSearch: { name: "",mId: 0, sId: 0},
	                        pagination: { pageSize: 5, total: 0, currentPage: 0 },
	                        banner: { isEdit: false, id: 0, list: [] },
//	                        products: { isEdit: false, fileList: [] ,module: {
//	                                 id: 0, mId: 0, sId: 0,avatar: "", remark: "", price: "", name: ""
//	                        } },
                                edit: {
                                        isAdd: false,
                                        isEdit: false,
                                        fileList: [],
                                        model: { id: 0, mId: 0, sId: 0, name: '', avatar: '', remark: '', price: '',  },
                                        rules: {        //制定表单元素验证规则
                                                name: [
                                                        { required: true, message: '商品名称不能为空', trigger: 'blur' },
                                                        { min: 2, max: 20, message: '商品名称必须在2-20之间', trigger: 'blur' },
                                                ],
                                                remark: [
                                                        { required: true, message: '商品介绍不能为空', trigger: 'blur' },
                                                        { min: 2, max: 200, message: '商品分类介绍必须在2-200之间', trigger: 'blur' },
                                                ],
                                                price: [
                                                        { validator: checkPrice, trigger: 'blur' }
                                                ],
                                        },
                                },

                        }
                },
	        computed: {
		        ...mapState("category", ["mainList", "subLists"]),
                        ...mapState("product", ["list"]),
		        subList() {
		                if(this.search.mId === 0) return [];
		                else return this.subLists[this.search.mId] || [];
		        },
//		        subList2() {
//		                if(this.products.module.mId === 0) return [];
//		                else return this.subLists[this.products.module.mId] || [];
//		        }
                        subList2() {
                                if(this.edit.model.mId === 0) return [];
                                else return this.subLists[this.edit.model.mId] || [];
                        },
	        },
	        watch: {
                        "search.mId": function(newValue, oldValue) {
                                this.search.sId = 0;
                                if(newValue !== 0) {
                                        this.searchSId = true;
                                        this.initSubLists(newValue)
	                                        .then(() => this.searchSId = false);
                                }
                        },
//                        "products.module.mId": function(newValue, oldValue) {
//                                this.products.module.sId = 0;
//                                if(newValue !== 0) {
//                                        this.initSubLists(newValue)
//                                                .then(() => {});
//                                }
//                        }
                        'edit.model.mId' : function(newValue, oldValue) {
                                this.edit.model.sId = 0;
                                if(newValue !== 0){
                                        this.searchSId = true;
                                        this.initSubLists(newValue)
                                                .then(() => this.searchSId = false);
                                }
                        }
	        },
	        methods: {
                        ...mapActions('category',['initMainList', 'initSubLists']),
                        ...mapActions('product', ['getData', 'removeBanner', 'addProduct', 'updateProduct', 'removeProduct']),
                        ...mapMutations('product', ['uploadBanner']),
		        getData2(currentPage) {
		                this.pagination.currentPage = currentPage;
		                this.getData({
			                ...this.ajaxSearch,
			                begin: (this.pagination.currentPage - 1) * this.pagination.pageSize,
			                pageSize: this.pagination.pageSize
		                }).then(total => this.pagination.total = total);
		        },
//                        uploadSuccess(response, file, fileList) {
//                                if(response.status === 200) {
//                                        this.products.module.avatar = response.data;
//                                        this.products.fileList = fileList.slice(-1);
//                                }
//                        },
                        uploadSuccess(response, file, fileList) {
                                if(response.status === 200) {
                                        this.edit.model.avatar = response.data;
                                        this.edit.fileList = fileList.slice(-1);
                                }
                        },
                        searchHandler() {
		                this.ajaxSearch.name = this.search.name;
		                this.ajaxSearch.mId = this.search.mId;
		                this.ajaxSearch.sId = this.search.sId;
		                this.getData2(1);
		        },
		        beginBannerEdit(row) {
		                this.banner.id = row.id;
		                if(row.bannerImages) {
                                        row.bannerImages.split(",").forEach(item => {
                                                this.banner.list.push({
                                                        name: item.substr(item.lastIndexOf("/") + 1),
                                                        url: item
                                                });
                                        });
		                }
		                this.banner.isEdit = true;
		        },
		        endBannerEdit() {
                                this.banner.id = 0;
                                this.banner.list = [];
		                this.banner.isEdit = false;
		        },
		        bannerUploadSuccessHandler({ status, data }, file, fileList) {
		                if(status === 200) {
		                        this.uploadBanner({ id: this.banner.id, filePath: data });
		                        this.banner.list.push({
			                        name: data.substr(data.lastIndexOf("/") +1),
			                        url: data,
			                        uid: file.uid
		                        })
		                }
		        },
                        bannerBeforeRemoveHandler(file, fileList) {
                                this.$confirm('真删?','提示', { type: 'warning' })
                                        .then(() => {
                                                this.removeBanner({ id: this.banner.id, filePath: file.url })
                                                        .then(() => {
                                                                let i = this.banner.list.findIndex(item => item.url === file.url);
                                                                this.banner.list.splice(i, 1);
                                                        });
                                        })
                                        .catch(() => {});
                                return false; //不让删除
                        },
                        beginEdit(row, isAdd) {
                                console.log(row);
                                this.edit.fileList = [];
                                if(this.$refs.form) this.$refs.form.clearValidate();
                                if(isAdd) {
                                        this.edit.isAdd = true;
                                        this.edit.model.id = 0;
                                        this.edit.model.mId = 0;
                                        this.edit.model.sId = 0;
                                        this.edit.model.name = '';
                                        this.edit.model.remark = '';
                                        this.edit.model.oldAvatar = '';
                                        this.edit.model.avatar = '';
                                        this.edit.model.price = '';
                                } else {
                                        this.edit.isAdd = false;
                                        this.edit.model.id = row.id;
                                        this.edit.model.mId = row.mainCategoryId;
                                        setTimeout(() =>{
                                                this.edit.model.sId = row.cid;
                                        }, 300);
                                        this.edit.model.name = row.name;
                                        this.edit.model.oldAvatar = row.avatar;
                                        this.edit.model.avatar = row.avatar;
                                        this.edit.model.remark = row.remark;
                                        this.edit.model.price = row.price;
                                }
                                this.edit.isEdit = true;
                        },
                        removeFile(file, fileList) {    //删除未确定之前上传的图片
                                this.edit.fileList = [];
                                if(this.edit.isAdd) this.edit.model.avatar = '';
                                else this.edit.model.avatar = this.edit.model.oldAvatar;
                        },
                        productEdit(){
                                this.$refs.form.validate()
                                        .then(() =>{
                                                if(this.edit.isAdd && this.edit.model.avatar === ''){
                                                        this.$alert('必须为分类选择一张图片...', '提示', {type: 'warning'});
                                                        return;
                                                }
                                                if(this.edit.isAdd){   //新增
                                                        this.addProduct(this.edit.model)
                                                                .then(data =>{
                                                                        this.edit.isEdit = false;
                                                                        this.getData2(this.pagination.currentPage);
                                                                });
                                                }else {                //修改
                                                        this.updateProduct(this.edit.model)
                                                                .then(() => {
                                                                        this.edit.isEdit = false; //关闭编辑页面
                                                                        this.getData2(this.pagination.currentPage);
                                                                })
                                                }
                                        })
                        },
                        removeProduct2(row) {
                                console.log(row);
                                this.$confirm(`确定删除 '${ row.name } ？`, '提示', {type: 'warning'})
                                        .then(() => {
                                                //通知仓库删除指定分类数据
                                                this.removeProduct(row)
                                                        .then(() => {});
                                        }).catch(() => this.$message({type: 'info', message: '已取消删除！'}));
                        },
//		        add() {
//		                this.products.isEdit = true;
//		        },
//		        endAdd() {
//		                this.products.module.name = "";
//		                this.products.module.avatar = "";
//		                this.products.module.price = "";
//		                this.products.isEdit = false;
//		        },
//		        sure() {
//		                this.getData1(this.products.module);
//		        }
	        },
		created() {
                        this.initMainList();
                        this.getData2(1);
		}
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		min-width: 1050px;
		.old-avatar
			/*display: inline-block*/
			width: 147px
			height: 147px
			border-radius: 6px
			border: 1px dashed black
			margin-bottom: 10px
			vertical-align: top
			.avatar-uploader
				display: inline-block
				position: relative
				overflow: hidden
				.avatar-uploader-icon
					/*border: 1px dashed #d9d9d9*/
					/*border-radius: 6px*/
					cursor: pointer
					font-size: 28px
					color: #8c939d
					width: 140px
					height: 140px
					line-height: 140px
					text-align: center
					background-color: #fbfdff
</style>