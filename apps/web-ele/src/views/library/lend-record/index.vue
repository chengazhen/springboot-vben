<template>
  <div class="p-4">
    <el-card class="mb-4">
      <div class="flex justify-between items-center">
        <el-form :inline="true" :model="searchForm" class="flex-1">
          <el-form-item label="书名">
            <el-input v-model="searchForm.bookName" placeholder="请输入书名" />
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="searchForm.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchForm.status" placeholder="请选择状态">
              <el-option label="已借出" value="borrowed" />
              <el-option label="已归还" value="returned" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="handleAdd">新增借阅</el-button>
      </div>
    </el-card>

    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="bookName" label="书名" />
        <el-table-column prop="username" label="借阅人" />
        <el-table-column prop="lendDate" label="借阅日期" />
        <el-table-column prop="returnDate" label="应还日期" />
        <el-table-column prop="actualReturnDate" label="实际归还日期" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'borrowed' ? 'warning' : 'success'">
              {{ scope.row.status === 'borrowed' ? '已借出' : '已归还' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button
              v-if="scope.row.status === 'borrowed'"
              type="primary"
              link
              @click="handleReturn(scope.row)"
            >
              归还
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex justify-center mt-4">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 30, 50]"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <el-dialog v-model="dialogVisible" title="新增借阅" width="500px">
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="80px"
        class="mt-4"
      >
        <el-form-item label="图书" prop="bookId">
          <el-select
            v-model="form.bookId"
            filterable
            remote
            :remote-method="handleBookSearch"
            :loading="bookLoading"
            placeholder="请输入书名搜索"
          >
            <el-option
              v-for="item in bookOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户" prop="userId">
          <el-select
            v-model="form.userId"
            filterable
            remote
            :remote-method="handleUserSearch"
            :loading="userLoading"
            placeholder="请输入用户名搜索"
          >
            <el-option
              v-for="item in userOptions"
              :key="item.id"
              :label="item.username"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="借阅日期" prop="lendDate">
          <el-date-picker
            v-model="form.lendDate"
            type="date"
            placeholder="选择借阅日期"
          />
        </el-form-item>
        <el-form-item label="应还日期" prop="returnDate">
          <el-date-picker
            v-model="form.returnDate"
            type="date"
            placeholder="选择应还日期"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'

const searchForm = reactive({
  bookName: '',
  username: '',
  status: '',
})

const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const dialogVisible = ref(false)
const formRef = ref<FormInstance>()

const form = reactive({
  bookId: '',
  userId: '',
  lendDate: '',
  returnDate: '',
})

const rules = reactive<FormRules>({
  bookId: [
    { required: true, message: '请选择图书', trigger: 'change' },
  ],
  userId: [
    { required: true, message: '请选择用户', trigger: 'change' },
  ],
  lendDate: [
    { required: true, message: '请选择借阅日期', trigger: 'change' },
  ],
  returnDate: [
    { required: true, message: '请选择应还日期', trigger: 'change' },
  ],
})

const bookLoading = ref(false)
const userLoading = ref(false)
const bookOptions = ref([])
const userOptions = ref([])

const handleSearch = () => {
  // TODO: 实现搜索功能
  loadData()
}

const handleAdd = () => {
  dialogVisible.value = true
  form.bookId = ''
  form.userId = ''
  form.lendDate = ''
  form.returnDate = ''
}

const handleReturn = (row: any) => {
  ElMessageBox.confirm('确认归还该图书吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    // TODO: 实现归还功能
    ElMessage.success('归还成功')
    loadData()
  })
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      // TODO: 实现提交功能
      ElMessage.success('借阅成功')
      dialogVisible.value = false
      loadData()
    }
  })
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
  loadData()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  loadData()
}

const handleBookSearch = (query: string) => {
  if (query) {
    bookLoading.value = true
    // TODO: 实现图书搜索功能
    setTimeout(() => {
      bookOptions.value = [
        { id: '1', name: '深入理解计算机系统' },
        { id: '2', name: 'JavaScript高级程序设计' },
      ]
      bookLoading.value = false
    }, 200)
  } else {
    bookOptions.value = []
  }
}

const handleUserSearch = (query: string) => {
  if (query) {
    userLoading.value = true
    // TODO: 实现用户搜索功能
    setTimeout(() => {
      userOptions.value = [
        { id: '1', username: '张三' },
        { id: '2', username: '李四' },
      ]
      userLoading.value = false
    }, 200)
  } else {
    userOptions.value = []
  }
}

const loadData = () => {
  // TODO: 实现数据加载功能
  // 模拟数据
  tableData.value = [
    {
      id: '1',
      bookName: '深入理解计算机系统',
      username: '张三',
      lendDate: '2024-01-01',
      returnDate: '2024-02-01',
      actualReturnDate: null,
      status: 'borrowed',
    },
    {
      id: '2',
      bookName: 'JavaScript高级程序设计',
      username: '李四',
      lendDate: '2024-01-15',
      returnDate: '2024-02-15',
      actualReturnDate: '2024-02-10',
      status: 'returned',
    },
  ]
  total.value = 100
}

// 初始加载
loadData()
</script>
