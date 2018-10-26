<template>
  <div v-fixed-th class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="序号" width="95" type="index"></el-table-column>
      <el-table-column prop="date" label="日期" min-width="200">
      </el-table-column>
      <el-table-column prop="name" label="姓名" min-width="200">
      </el-table-column>
      <el-table-column prop="region" label="地区" min-width="200">
      </el-table-column>
      <el-table-column prop="province" label="省份" min-width="200">
      </el-table-column>
      <el-table-column prop="city" label="城市" min-width="200">
      </el-table-column>
      <el-table-column prop="address" label="公司地址" min-width="200">
      </el-table-column>
      <el-table-column prop="zip" label="邮编" min-width="200">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getList} from '@/api/table'

export default {
  filters: {
    statusFilter (status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data () {
    return {
      list: null,
      listLoading: true,
      currentPage: 1
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    handleSizeChange () {
    },
    handleCurrentChange () {
    }
  }
}
</script>
