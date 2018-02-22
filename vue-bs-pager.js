/*!
 * @author: lihaitao
 * @webSite: http://blog.csdn.net/lhtzbj12/
 * @version: v0.5
 * @opensource:
 * @description: 使用基于Vue和Bootstrap的分页导航组件
 * @调用示例
 <bs-pager v-bind:total-count="totalcount" v-bind:page-size="pageSize"
  v-bind:page-index="pageIndex" v-on:page-change="pageChange"></bs-pager>
 */
Vue.component('bs-pager', {
    props: {
        totalCount: { //数据总条数
            type: Number,
            default: 0
        },
        pageSize: { //每页显示数
            type: Number,
            default: 10,
            validator: function (value) {
                return value > 0
            }
        },
        pageIndex: { //当前页数
            type: Number,
            default: 0
        },
        extClass: {  //扩展的样式 pagination-lg  pagination-sm
            type: String,
            default: ''
        },
        showNearby: { //当前按钮前后按钮数
            type: Number,
            default: 3,
            validator: function (value) {
                return value > 0
            }
        },
        infoTemplate: { //分页信息模板
            type: String,
            default: '总共 {{totalCount}} 项 每页显示 {{pageSize}} 项 当前 {{pageIndex}}/{{totalPage}} 页'
        }
    },
    data: function () {
        return {
            inputPageIndex: ''
        }
    },
    template: '<div class="bs-pager clearfix"> \
                    <div class="bs-pager-info " v-bind:class="extClass" >{{infoContent}}</div> \
                    <ul class="pagination pull-right" v-bind:class="extClass"> \
                         <template v-for="p in navPages" > \
                            <pager-btn v-if="p !== \'...\'" v-bind:num="p" v-on:page-change="pageChange" v-bind:page-index="pageIndex"></pager-btn> \
                            <li v-else><span >{{p}}</span></li> \
                         </template>     \
                         <li v-if="showInputPage"><input type="text" v-model="inputPageIndex" v-on:change="inputPageChange"></li> \
                    </ul> \
                </div> ', //这里 v-on:pageChange是可以的，但是在dom里只能用page-change
    computed: {
        //总页数
        totalPage: function () {
            return parseInt((this.totalCount + this.pageSize - 1) / this.pageSize)
        },
        showInputPage:function () {
            return this.totalPage > 5
        },
        //计算显示出来的按钮集合
        navPages: function () {
            let pages = [], leftdot = false, rightdot = false
            for (let i = 1; i <= this.totalPage; i++) {
                //首页和最后一页始终显示
                if (i === 1 || (i === this.totalPage && this.totalPage > 1 )) {
                    pages.push(i)
                    continue
                }
                //离当前页面近，则显示
                if (Math.abs(this.pageIndex - i) <= this.showNearby) {
                    pages.push(i)
                } else {
                    //离得远，则显示一次 省略号
                    if (this.pageIndex > i && !leftdot) {
                        pages.push('...')
                        leftdot = true
                    }
                    if (this.pageIndex < i && !rightdot) {
                        pages.push('...')
                        rightdot = true
                    }
                }
            }
            return pages
        },
        //显示分页信息
        infoContent: function () {
            let info = this.infoTemplate
            info = info.replace('{{totalCount}}', this.totalCount).replace('{{pageSize}}', this.pageSize)
            info = info.replace('{{pageIndex}}', this.pageIndex).replace('{{totalPage}}', this.totalPage)
            return info
        }
    },
    methods: {
        //点击按钮时触发
        pageChange: function (num) {
            this.$emit('page-change', num)
        },
        //是否当前页
        isActive: function (num) {
            return this.pageIndex === num
        },
        inputPageChange: function () {
            if (/^\d+$/.test(this.inputPageIndex) && this.inputPageIndex > 0 && this.inputPageIndex <= this.totalPage) {
                let index = parseInt(this.inputPageIndex)
                this.$emit('page-change', index)
            }
            this.inputPageIndex = ''
        }
    },
    components: {
        'pager-btn': {
            props: ['num', 'pageIndex'],
            computed: {
                isActive: function () {
                    //计算是否当前页数
                    return this.num === this.pageIndex
                }
            },
            template: '<li v-bind:class="{active:isActive}"><a href="#" @click="goto(num,isActive)" >{{num}}</a></li>',
            methods: {
                goto: function (num, active) {
                    //如果是省略号或者当前页，则不做任何反应
                    if (active) {
                        return
                    }
                    this.$emit('page-change', num)
                }
            }
        }
    }
})