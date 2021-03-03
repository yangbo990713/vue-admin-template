<template>
  <div class="classification-list">
    <div class="search-nav">
      <el-form inline size="small">
        <el-form-item label="订单编号：">
          <el-input v-model="code" clearable placeholder="请输入订单编号" />
        </el-form-item>
        <el-form-item label="物品名称：">
          <el-input v-model="name" clearable placeholder="请输入物品名称" />
        </el-form-item>
        <el-form-item>
          <el-button @click="getData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      border
    >
      <el-table-column
        label="订单编号"
        prop="number"
      />
      <el-table-column
        label="物品编号"
        prop="commodity_number"
      />
      <el-table-column
        label="物品名称"
        prop="commodity_name"
      />
      <el-table-column
        label="物品数量"
        prop="quantity"
      />
      <el-table-column
        label="物品单价"
        prop="commodity_price"
      />
      <el-table-column
        label="合计"
      >
        <template slot-scope="{row}">
          {{ row.commodity_price*row.quantity }}
        </template>
      </el-table-column>
      <el-table-column
        label="日期"
        prop="date"
      />
      <el-table-column
        label="商家"
        prop="business_name"
      />
      <el-table-column
        label="级别"
        prop="levelName"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.level===2?'danger':'info'">{{ row.level===2?'加急':'普通' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="编辑"
        width="100"
      >
        <template slot-scope="{row}">
          <el-button icon="el-icon-edit" size="small" @click="editOrder(row)" />
        </template>
      </el-table-column>
      <el-table-column
        label="删除"
        width="100"
      >
        <template slot-scope="{row}">
          <el-button icon="el-icon-delete" size="small" type="danger" @click="delOrder(row)" />
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="visible" title="编辑订单">
      <order-form :params="currentItem" @confirm="confirmEdit" />
    </el-dialog>
  </div>
</template>

<script>
import OrderForm from '@/views/order/components/orderForm'
import Axios from 'axios'
export default {
  name: 'OrderList',
  components: { OrderForm },
  data() {
    return {
      tableData: [],
      code: '',
      name: '',
      visible: false,
      currentItem: {
        name: '',
        code: '',
        classificationId: '',
        classification: '',
        price: '',
        number: ''
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      Axios.get('http://tp51/index.php/api/OrderInformation/orderList', {
        params: {
          number: this.code,
          name: this.name
        }
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.tableData = data.data
        }
      })
    },
    editOrder(row) {
      this.currentItem = { ...row }
      this.visible = true
    },
    delOrder(row) {
      this.$confirm('是否确认删除该订单', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Axios.get('http://tp51/index.php/api/OrderInformation/delOrder', {
          params: {
            id: row.id
          }
        }).then(({ data }) => {
          if (data && data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          this.getData()
        })
      }).catch(() => {

      })
    },
    confirmEdit(row) {
      delete row.commodity_name
      delete row.commodity_price
      delete row.commodity_number
      delete row.business_name
      Axios.get('http://tp51/index.php/api/OrderInformation/editOrder', {
        params: {
          ...row
        }
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.visible = false
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.getData()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.classification-list{
  background-color: #fff;
  margin: 15px;
  .search-nav{
    padding: 10px;
    ::v-deep .el-form--inline .el-form-item{
      margin-bottom: 0;
    }
  }

  ::v-deep .el-table--border th.gutter:last-of-type {
    display: block!important;
    width: 17px!important;
  }
}
</style>
