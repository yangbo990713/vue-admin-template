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
          <el-button @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      border
    >
      <el-table-column
        label="订单编号"
        prop="code"
      />
      <el-table-column
        label="物品编号"
        prop="goodsCode"
      />
      <el-table-column
        label="物品名称"
        prop="goodsName"
      />
      <el-table-column
        label="物品数量"
        prop="number"
      />
      <el-table-column
        label="物品单价"
        prop="price"
      />
      <el-table-column
        label="合计"
      >
        <template slot-scope="{row}">
          {{ row.price*row.number }}
        </template>
      </el-table-column>
      <el-table-column
        label="日期"
        prop="date"
      />
      <el-table-column
        label="商家"
        prop="merchantName"
      />
      <el-table-column
        label="级别"
        prop="levelName"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.levelId===1?'danger':'info'">{{ row.levelName }}</el-tag>
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
      const tableData = localStorage.getItem('orderList')
      if (tableData) {
        this.tableData = JSON.parse(tableData)
      }
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
        this.tableData = this.tableData.filter(item => item.id !== row.id)
        localStorage.setItem('orderList', JSON.stringify(this.tableData))
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {

      })
    },
    search() {
      this.getData()
      this.tableData = this.tableData.filter(item => item.code.includes(this.code) && item.goodsName.includes(this.name))
    },
    confirmEdit(row) {
      if (this.tableData.find(item => item.code === row.code && item.id !== row.id)) {
        this.$message.error('订单编号重复')
        return
      }
      this.visible = false
      const index = this.tableData.findIndex(item => item.id === row.id)
      this.tableData.splice(index, 1, row)
      localStorage.setItem('orderList', JSON.stringify(this.tableData))
      this.$message({
        type: 'success',
        message: '修改成功'
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
