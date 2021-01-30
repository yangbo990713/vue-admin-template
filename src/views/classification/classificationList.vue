<template>
  <div class="classification-list">
    <div class="search-nav">
      <el-form inline size="small">
        <el-form-item label="类别名称：">
          <el-input v-model="searchText" clearable placeholder="请输入类别名称" />
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
        label="类别名称"
        prop="name"
      />
      <el-table-column
        label="编辑"
        prop="name"
        width="100"
      >
        <template slot-scope="{row}">
          <el-button icon="el-icon-edit" size="small" @click="editClassification(row)" />
        </template>
      </el-table-column>
      <el-table-column
        label="删除"
        prop="address"
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
      const tableData = localStorage.getItem('classificationList')
      if (tableData) {
        this.tableData = JSON.parse(tableData)
      }
    },
    editClassification(row) {
      this.$prompt('请输入类别名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: row.name,
        inputValidator(val) {
          if (!val) {
            return '类别名称不能为空'
          }
          return true
        }
      }).then(({ value }) => {
        const item = this.tableData.find(item => item.id === row.id)
        item.name = value
        localStorage.setItem('classificationList', JSON.stringify(this.tableData))
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }).catch(() => {})
    },
    delClassification(row) {
      this.$confirm('是否确认删除该类别', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData = this.tableData.filter(item => item.id !== row.id)
        localStorage.setItem('classificationList', JSON.stringify(this.tableData))
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {

      })
    },
    search() {
      this.getData()
      this.tableData = this.tableData.filter(item => item.name.includes(this.searchText))
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
}
</style>
