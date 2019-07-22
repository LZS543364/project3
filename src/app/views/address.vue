<template>
	<div class="root">
		<div class="nav">
			<img src="../assets/images/order/std_tittlebar_main_device_back_normal.png" alt="" @click="goBack">
			<p v-text='isEdit ? "编辑地址" : "收货地址"'></p>
			<h4 v-text='isEdit ? "删除" : ""' @click="remove2(editId)"></h4>
		</div>
		<div class='content' v-show="!isEdit">
			<span class="content-lace"></span>
			<ul class='clearfix' >
				<li v-for="item in list">
					<!--<div class="address-left"  @click="editAddress2(item)">-->
						<!--<span v-text="item.receiveName"></span>-->
						<!--&lt;!&ndash;<i class="default" v-show="item.isDefault.data[0] === 1 ">默认</i>&ndash;&gt;-->
					<!--</div>-->
					<!--<div class="address-content" @click="editAddress2(item)">-->
						<!--<span v-text="item.receiveTel"></span>-->
						<!--<p v-text="item.receiveAddress"></p>-->
					<!--</div>-->
					<!--<i class="remove" @click="remove2(item.id)"></i>-->
					<div class="content-items">
						<div class="top">
							<p v-text="item.receiveName"></p>
							<h4 v-text='item.receiveTel.substr(0, 3) + "****" + item.receiveTel.substr(7)'></h4>
						</div>
						<div class="content">
							<p v-text="item.receiveAddress"></p>
							<h4>26601</h4>
						</div>
					</div>
					<img src="../assets/images/address_icon_editor.png" alt="" class="update" @click="editAddress2(item)">
				</li>
			</ul>
			<button class="btn-add" @click=" isEdit = true ">
				+ 添加地址
			</button>
		</div>
		<div class="add-address" v-show="isEdit">
			<div class="add-content">
				<div class="inputs-wrapper">
					<input placeholder="姓名" type="text" v-model="name" />
					<input placeholder="手机号码" type="text" v-model="phone">
					<!--省市区三级联动-->
					<div class="divwrap" v-if="show">
						<v-distpicker type="mobile" @province="onChangeProvince1" @city="onChangeCity"
						              @area="onChangeArea"></v-distpicker>
					</div>
					<!--遮罩层-->
					<div class="blacks" v-if="show" @click="countermand"></div>
					<!--触发选择-->
					<div @click="choose" class="place-wrapper">
						<span v-text="city === '' ? '请选择' : city"></span>
					</div>
					<input placeholder="详细地址，如街道、楼盘号等" type="text" v-model="detail">
				</div>
			</div>
			<div class="btn-wrapper">
				<button @click="addAddress2">保存并使用</button>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { createNamespacedHelpers } from 'vuex';
	let { mapState, mapActions } = createNamespacedHelpers('address');
        import VDistpicker from 'v-distpicker';

        export default {
                components: { VDistpicker },
                data(){
                        return {
                                isEdit: false,
	                        editId: 0,
	                        name: '',
	                        phone: '',
	                        detail: '',
                                lxr: '',
                                lxdh: '',
                                show: false,
                                //省市区
                                province: '',
                                city: '',
                                area: ''
                        }
                },
                props: ['ips'],
                computed: {
	                ...mapState(['list']),
                },
                methods: {
	                ...mapActions(['getData', 'remove', 'addAddress', 'editAddress']),

                        remove2(data) {
                                if(!confirm('确定删除？')) return;
                                this.remove({ id: data })
                                .then(() => this.isEdit = false);
                        },
	                cancleEdit() {
                                this.isEdit = false;
                                this.city = '';
                                this.name = '';
                                this.phone = '';
                                this.detail = '';
                                this.editId = 0;
	                },
	                addAddress2() {
	                        let receiveName = this.name, receiveTel = this.phone, receiveAddress = this.city + this.detail, id = this.editId;
				if(this.name === '') { this.$store.commit('alert/open', '请输入收件人'); return; }
				else {
				        if(this.phone === '') { this.$store.commit('alert/open', '请输入收件号码'); return; }
				        else {
				                if(this.detail === '') { this.$store.commit('alert/open', '请输入详细地址'); return; }
				                else {
				                        if(this.city === '') { this.$store.commit('alert/open', '请选择居住地'); return; }
				                        else {
				                                if(this.editId === 0) {
                                                                        this.addAddress({ receiveName, receiveTel, receiveAddress })
                                                                                .then(() => {
                                                                                        this.$store.commit('alert/open', '添加地址成功');
                                                                                        this.cancleEdit();
                                                                                })
				                                } else {
                                                                        this.editAddress({ id, receiveName, receiveTel, receiveAddress })
	                                                                        .then(() => {
                                                                                        this.$store.commit('alert/open', '修改地址成功');
                                                                                        this.cancleEdit();
	                                                                        })
				                                }
					                }
				                }
			                }
		                }

	                },
	                editAddress2(item) {
				this.isEdit = true;
				this.editId = item.id;
				this.name = item.receiveName;
				this.phone = item.receiveTel;
				this.city = item.receiveAddress;
	                },
                        //取消选择地区
                        countermand: function () {
                                this.show = false
                        },
                        //打开选择地区
                        choose: function () {
                                this.show = true;
                        },
                        onChangeProvince1: function (a) {
                                this.province = a.value;
                                if (a.value == '台湾省') {
                                        this.show = false;
                                }
                        },
                        onChangeCity: function (a) {
                                this.city = a.value;
                        },
                        onChangeArea: function (a) {
                                this.area = a.value;
                                this.show = false;
                                this.city = this.province + this.city + this.area;
                        },
	                goBack: function() {
                                this.$router.go(-1);
	                }
                },
                created() {
			this.getData()
                },
        };
</script>

<style scoped>
	.root {
		width:100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		font-size: 0.24rem;
	}
	.nav {
		/*padding: 0 0.2rem;*/
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 0.02rem solid #e9e9e9;
	}
	.nav>img {
		width: 0.8rem;
	}
	.nav>p {
		/*margin-right: 3.2rem;*/
		font-size: 0.32rem;
		color: #333333;
	}
	.nav>h4 {
		font-size: 0.28rem;
		color: #666;
		font-weight: normal;
		padding-right: 0.2rem;
	}
	.content {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: white;
	}
	.content-lace {
		display: block;
		height: 0.1rem;
		width: 100%;
		/*background-image: url("../assets/images/address/001.png");*/
		background-size: 0.6rem 0.1rem ;
		/*background-repeat: no-repeat;*/
	}
	.content>ul {
		display: flex;
		width: 100%;
		height: 100%;
		flex-grow: 1;
		overflow: auto;
		flex-direction: column;
		align-items: center;
	}
	.content>ul>li {
		box-sizing: border-box;
		display: flex;
		height: 1.8703rem;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		padding: 0 0.30016rem;
		border-bottom: 0.01rem solid #d9d9d9;
		font-size: 0.280147rem;
		flex-shrink: 0;
	}
	.content>ul>li>.content-items  {
		width: 100%;
		/*padding-top: 0.3rem;*/
	}
	.content>ul>li>img  {
		width: 0.34rem;
		height: 0.34rem;
	}
	.content>ul>li>.content-items>.top  {
		/*width: 90%;*/
		display: flex;
		justify-content: space-between;
		padding-bottom: 0.2rem;
	}
	.content>ul>li>.content-items>.top>p  {
		color: #333333;
		font-size: 0.3rem;
	}
	.content>ul>li>.content-items>.top>h4  {
		color: #333333;
		font-size: 0.3rem;
		font-weight: normal;
		padding-right: 0.2rem;
	}
	.content>ul>li>.content-items>.content  {}
	.content>ul>li>.content-items>.content>p  {
		font-size: 0.24rem;
		color: #666666;
		display: inline-block;
	}
	.content>ul>li>.content-items>.content>h4 {
		font-weight: normal;
		font-size: 0.24rem;
		color: #666666;
		padding-top: 0.1rem;
	}
	.content>ul>li>.content-items>.content>h3 {
		font-weight: normal;
		font-size: 0.24rem;
		color: #666666;
		display: inline-block;
	}

	.btn-add {
		display: block;
		height: 0.9605rem;
		line-height: 0.9605rem;
		text-align: center;
		border: 0.01rem solid #B4282D;
		flex-shrink: 0;
		margin: 0 0.30016rem 0.30016rem 0.30016rem;
		background: #f4f4f4;
		font-size: 0.280147rem;
		color: #845f3f;
		outline: none;
		border-radius: 0.1rem;
	}
	.add-address {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		background-color: white;
		justify-content: center;
		align-items: center;
	}
	.add-content {
		flex-grow: 1;
		width: 100%;
	}
	.inputs-wrapper {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		/*justify-content: center;*/
		padding-left: 0.3rem;
	}
	.inputs-wrapper>input {
		height: 0.9463rem;
		outline: none;
		border-style: none;
		border-bottom: 0.01rem solid #bbb;
		font-size: 0.28rem;
	}
	.place-wrapper {
		height: 0.9463rem;
		font-size: 0.28rem;
		line-height: 0.9463rem;
		color: #999999;
	}
	.btn-wrapper {
		display: block;
		height: 0.9605rem;
		line-height: 0.9605rem;
		text-align: center;
		/*-ms-flex-negative: 0;*/
		flex-shrink: 0;
		margin: 0 0.30016rem 0.30016rem 0.30016rem;
		background: #f4f4f4;
		font-size: 0.280147rem;
		color: #845f3f;
		outline: none;
		border-radius: 0.1rem;
		width:90%;
	}
	.btn-wrapper>button {
		height: 0.9605rem;
		flex-grow: 1;
		font-size: 0.28rem;
		/*border-style: none;*/
		outline: none;
		width: 100%;
		color: #845f3f;
		border-radius: 0.1rem;
		border: 0.01rem solid #B4282D;
	}
	.btn-wrapper>button:nth-child(1) {
		background-color: white;
	}
	.btn-wrapper>button:nth-child(2) {
		background-color: #B4282D;
	}

	.blacks {
		position: fixed;
		width: 100%;
		height: 50%;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.45);
	}
	/*省市区三级联动*/
	.divwrap {
		height: 50%;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 99;
	}

	/*外部*/
	.divwrap > .distpicker-address-wrapper {
		color: #0d0d0d;
		height: 100%;
	}

	/*头部*/
	.divwrap >>> .address-header {
		background: lightblue;
		color: #fff;
		width: 100%;
		position: fixed;
		bottom: 50%;
		font-size: 0.28rem;

	}

	/*头部内容*/
	.divwrap >>> .address-header ul li {
		flex-grow: 1;
		text-align: center;
		height: 0.6rem;
		line-height: 0.6rem;
	}

	/*选择过省市区的头部*/
	.divwrap >>> .address-header .active {
		color: #fff;
		border-bottom: 0.05rem solid #666;
	}

	/*内容部分*/
	.divwrap >>> .address-container {
		overflow: scroll;
		height: 100%;
		font-size: 0.28rem;
		font-weight: 400;
	}
	/*点过的地区内容*/
	.divwrap >>> .address-container .active {
		color: red;
	}

</style>