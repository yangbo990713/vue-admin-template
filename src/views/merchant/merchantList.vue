<template>
  <div class="classification-list">
    <div class="search-nav">
      <el-form inline size="small">
        <el-form-item label="商家编号：">
          <el-input v-model="code" clearable placeholder="请输入商家编号" />
        </el-form-item>
        <el-form-item label="商家名称：">
          <el-input v-model="searchText" clearable placeholder="请输入商家名称" />
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
        label="商家编号"
        prop="number"
      />
      <el-table-column
        label="商家名称"
        prop="name"
      />
      <el-table-column
        label="联系人"
        prop="contact_person"
      />
      <el-table-column
        label="电话"
        prop="telephone"
      />
      <el-table-column
        label="地址"
        prop="address"
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
    <el-dialog :visible.sync="visible" title="编辑商家">
      <merchant-form :params="currentItem" @confirm="confirmEdit" />
    </el-dialog>
  </div>
</template>

<script>
import MerchantForm from '@/views/merchant/components/merchantForm'
import Axios from 'axios'

export default {
  name: 'MerchantList',
  components: { MerchantForm },
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
      Axios.get('http://tp51/index.php/api/BusinessInformation/businessList', {
        params: {
          name: this.searchText,
          number: this.code
        }
      }).then(({ data }) => {
        this.tableData = data.data
      })
    },
    editClassification(row) {
      this.currentItem = { ...row }
      this.visible = true
    },
    delClassification(row) {
      this.$confirm('是否确认删除该商家', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Axios.get('http://tp51/index.php/api/BusinessInformation/delBusiness', {
          params: {
            id: row.id
          }
        }).then(({ data }) => {
          this.getData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {

      })
    },
    confirmEdit(row) {
      this.visible = false
      Axios.get('http://tp51/index.php/api/BusinessInformation/editBusiness', {
        params: {
          ...row
        }
      }).then(() => {
        this.getData()
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.classification-list {
  background-color: #fff;
  margin: 15px;

  .search-nav {
    padding: 10px;

    ::v-deep .el-form--inline .el-form-item {
      margin-bottom: 0;
    }
  }

  ::v-deep .el-table--border th.gutter:last-of-type {
    display: block !important;
    width: 17px !important;
  }
}
</style>
