<template>
  <div class="classification-list">
    <div class="search-nav">
      <el-form inline size="small">
        <el-form-item label="物品编号：">
          <el-input v-model="code" clearable placeholder="请输入物品编号" />
        </el-form-item>
        <el-form-item label="物品名称：">
          <el-input v-model="searchText" clearable placeholder="请输入物品名称" />
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
        label="物品编号"
        prop="code"
      />
      <el-table-column
        label="物品名称"
        prop="name"
      />
      <el-table-column
        label="类别"
        prop="classification"
      />
      <el-table-column
        label="价格"
        prop="price"
      />
      <el-table-column
        label="库存"
        prop="number"
      />
      <el-table-column
        label="编辑"
        width="100"
      >
        <template slot-scope="{row}">
          <el-button icon="el-icon-edit" size="small" @click="editGoods(row)" />
        </template>
      </el-table-column>
      <el-table-column
        label="删除"
        width="100"
      >
        <template slot-scope="{row}">
          <el-button icon="el-icon-delete" size="small" type="danger" @click="delGoods(row)" />
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="visible" title="编辑物品">
      <goods-form :params="currentItem" @confirm="confirmEdit" />
    </el-dialog>
  </div>
</template>

<script>
import GoodsForm from '@/views/goods/components/goodsForm'
export default {
  name: 'GoodsList',
  components: { GoodsForm },
  data() {
    return {
      tableData: [],
      searchText: '',
      code: '',
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
      const tableData = localStorage.getItem('goodsList')
      if (tableData) {
        this.tableData = JSON.parse(tableData)
      }
    },
    editGoods(row) {
      this.currentItem = { ...row }
      this.visible = true
    },
    delGoods(row) {
      this.$confirm('是否确认删除该物品', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData = this.tableData.filter(item => item.id !== row.id)
        localStorage.setItem('goodsList', JSON.stringify(this.tableData))
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {

      })
    },
    search() {
      this.getData()
      this.tableData = this.tableData.filter(item => item.name.includes(this.searchText) && item.code.includes(this.code))
    },
    confirmEdit(row) {
      if (this.tableData.find(item => item.code === row.code && item.id !== row.id)) {
        this.$message.error('物品编号重复')
        return
      }
      this.visible = false
      const index = this.tableData.findIndex(item => item.id === row.id)
      this.tableData.splice(index, 1, row)
      localStorage.setItem('goodsList', JSON.stringify(this.tableData))
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
