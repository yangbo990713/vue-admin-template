<template>
  <div class="classification-list">
    <div class="search-nav">
      <el-form inline size="small">
        <el-form-item label="类别名称：">
          <el-input v-model="searchText" clearable placeholder="请输入类别名称" />
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
        label="类别名称"
        prop="type_name"
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
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'ClassificationList',
  data() {
    return {
      tableData: [],
      searchText: ''
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      Axios.get('http://tp51/index.php/api/CommodityType/typeList', { params: { type_name: this.searchText }})
        .then(({ data }) => {
          if (data && data.code === 200) {
            this.tableData = data.data
          } else {
            this.$message.error(data)
          }
        })
    },
    editClassification(row) {
      this.$prompt('请输入类别名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: row.type_name,
        inputValidator(val) {
          if (!val) {
            return '类别名称不能为空'
          }
          return true
        }
      }).then(({ value }) => {
        Axios.get('http://tp51/index.php/api/CommodityType/editType', { params: {
          id: row.id,
          type_name: value
        }})
          .then(({ data }) => {
            if (data && data.code === 200) {
              this.$message.success('修改成功')
              this.getData()
            } else {
              this.$message.error(data)
            }
          })
      }).catch(() => {
      })
    },
    delClassification(row) {
      this.$confirm('是否确认删除该类别', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Axios.get('http://tp51/index.php/api/CommodityType/delType', { params: { id: row.id }})
          .then(({ data }) => {
            if (data && data.code === 200) {
              this.$message.success('删除成功')
              this.getData()
            } else {
              this.$message.error(data)
            }
          })
      }).catch(() => {

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
}
</style>
