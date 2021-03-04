<template>
  <div class="classification-list">
    <div class="search-nav">
      <el-form inline size="small">
        <el-form-item label="订单编号：">
          <el-input v-model="code" clearable placeholder="请输入订单编号" />
        </el-form-item>
        <el-form-item label="物品名称：">
          <el-input v-model="searchText" clearable placeholder="请输入物品名称" />
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
        label="退货数量"
        prop="quantity"
      />
      <el-table-column
        label="退货原因"
        prop="reason"
      />
      <el-table-column
        label="编辑"
        width="100"
      >
        <template slot-scope="{row}">
          <el-button icon="el-icon-edit" size="small" @click="editClassification(row)" />
        </template>
      </el-table-column>
      <el-table-column
        label="删除"
        width="100"
      >
        <template slot-scope="{row}">
          <el-button icon="el-icon-delete" size="small" type="danger" @click="delClassification(row)" />
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="visible" title="编辑退货单">
      <return-oder-form :params="currentItem" @confirm="confirmEdit" />
    </el-dialog>
  </div>
</template>

<script>

import ReturnOderForm from '@/views/returnOrder/components/returnOrderForm'
import Axios from 'axios'
export default {
  name: 'ReturnOrderList',
  components: { ReturnOderForm },
  data() {
    return {
      tableData: [],
      searchText: '',
      code: '',
      visible: false,
      currentItem: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      Axios.get('http://tp51/index.php/api/ReturnReceipt/returnReceiptList', {
        params: {
          name: this.searchText,
          number: this.code
        }
      }).then(({ data }) => {
        if (data.code === 200) {
          this.tableData = data.data
        }
      })
    },
    editClassification(row) {
      this.currentItem = { ...row }
      this.visible = true
    },
    delClassification(row) {
      this.$confirm('是否确认删除该退货单', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Axios.get('http://tp51/index.php/api/ReturnReceipt/delReturnReceipt', {
          params: {
            ...row
          }
        }).then(({ data }) => {
          if (data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getData()
          }
        })
      }).catch(() => {

      })
    },
    confirmEdit(row) {
      delete row.commodity_name
      delete row.commodity_number
      Axios.get('http://tp51/index.php/api/ReturnReceipt/editReturnReceipt', {
        params: {
          ...row
        }
      }).then(({ data }) => {
        if (data.code === 200) {
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
