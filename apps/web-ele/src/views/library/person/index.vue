<template>
  <div class="p-4">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="h-full">
          <div class="flex flex-col items-center">
            <el-avatar :size="100" :src="userInfo.avatar" />
            <h2 class="mt-4 text-xl font-bold">{{ userInfo.username }}</h2>
            <p class="mt-2 text-gray-500">{{ userInfo.role }}</p>
            <div class="mt-4 w-full">
              <div class="flex justify-between py-2 border-b">
                <span class="text-gray-500">手机号</span>
                <span>{{ userInfo.phone }}</span>
              </div>
              <div class="flex justify-between py-2 border-b">
                <span class="text-gray-500">邮箱</span>
                <span>{{ userInfo.email }}</span>
              </div>
              <div class="flex justify-between py-2 border-b">
                <span class="text-gray-500">地址</span>
                <span>{{ userInfo.address }}</span>
              </div>
            </div>
            <el-button type="primary" class="mt-4" @click="handleEdit">
              编辑资料
            </el-button>
          </div>
        </el-card>
      </el-col>

      <el-col :span="16">
        <el-card>
          <template #header>
            <div class="flex justify-between items-center">
              <span class="font-bold">我的借阅</span>
              <el-radio-group v-model="activeTab" size="small">
                <el-radio-button label="current">当前借阅</el-radio-button>
                <el-radio-button label="history">借阅历史</el-radio-button>
              </el-radio-group>
            </div>
          </template>

          <el-table :data="lendRecords" border style="width: 100%">
            <el-table-column prop="bookName" label="书名" />
            <el-table-column prop="lendDate" label="借阅日期" width="120" />
            <el-table-column prop="returnDate" label="应还日期" width="120" />
            <el-table-column
              prop="actualReturnDate"
              label="实际归还日期"
              width="120"
            />
            <el-table-column prop="status" label="状态" width="100">
              <template #default="scope">
                <el-tag
                  :type="scope.row.status === 'borrowed' ? 'warning' : 'success'"
                >
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
      </el-col>
    </el-row>

    <el-dialog v-model="dialogVisible" title="编辑个人资料" width="500px">
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="80px"
        class="mt-4"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" />
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

const userInfo = reactive({
  username: '张三',
  role: '普通用户',
  phone: '13800138000',
  email: 'zhangsan@example.com',
  address: '北京市朝阳区',
  avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
})

const activeTab = ref('current')
const lendRecords = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const dialogVisible = ref(false)
const formRef = ref<FormInstance>()

const form = reactive({
  username: '',
  phone: '',
  email: '',
  address: '',
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
  ],
  address: [
    { required: true, message: '请输入地址', trigger: 'blur' },
  ],
})

const handleEdit = () => {
  dialogVisible.value = true
  form.username = userInfo.username
  form.phone = userInfo.phone
  form.email = userInfo.email
  form.address = userInfo.address
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      // TODO: 实现提交功能
      Object.assign(userInfo, form)
      ElMessage.success('修改成功')
      dialogVisible.value = false
    }
  })
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

const handleSizeChange = (val: number) => {
  pageSize.value = val
  loadData()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  loadData()
}

const loadData = () => {
  // TODO: 实现数据加载功能
  // 模拟数据
  lendRecords.value = [
    {
      id: '1',
      bookName: '深入理解计算机系统',
      lendDate: '2024-01-01',
      returnDate: '2024-02-01',
      actualReturnDate: null,
      status: 'borrowed',
    },
    {
      id: '2',
      bookName: 'JavaScript高级程序设计',
      lendDate: '2024-01-15',
      returnDate: '2024-02-15',
      actualReturnDate: '2024-02-10',
      status: 'returned',
    },
  ]
  total.value = 100
}

// 监听标签页变化
watch(activeTab, () => {
  loadData()
})

// 初始加载
loadData()
</script>
