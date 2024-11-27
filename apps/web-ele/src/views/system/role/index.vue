<template>
  <div class="p-4">
    <el-card class="mb-4">
      <el-form :inline="true" :model="queryParams" class="flex flex-wrap gap-4">
        <el-form-item label="角色名称">
          <el-input
            v-model="queryParams.name"
            placeholder="请输入角色名称"
          />
        </el-form-item>
        <!-- <el-form-item label="角色编码">
          <el-input
            v-model="queryParams.roleCode"
            placeholder="请输入角色编码"
          />
        </el-form-item> -->
        <!-- <el-form-item label="状态">
          <el-select v-model="queryParams.status" placeholder="请选择状态">
            <el-option label="启用" value="1" />
            <el-option label="禁用" value="0" />
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <template #header>
        <div class="flex items-center justify-between">
          <span>角色列表</span>
          <el-button type="primary" @click="handleAdd">新增角色</el-button>
        </div>
      </template>

      <el-table :data="roleList" border style="width: 100%">
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="description" label="角色描述" />
        <!-- <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === '1' ? 'success' : 'danger'">
              {{ row.status === '1' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column> -->
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="primary" link @click="handleAssignPermission(row)"
              >分配权限</el-button
            >
            <el-button type="danger" link @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="queryParams.pageNum"
          v-model:page-size="queryParams.pageSize"
          :total="total"
          :page-sizes="[10, 20, 30, 50]"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 新增/编辑角色对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form
        ref="formRef"
        :model="formData"
        label-width="100px"
        :rules="formRules"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="备注" prop="description">
          <el-input
            v-model="formData.description"
            type="textarea"
            placeholder="请输入备注"
            :rows="3"
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
import { ref, reactive } from 'vue';
import {
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  ElTable,
  ElTableColumn,
  ElButton,
  ElPagination,
} from 'element-plus';
import { ElMessage } from 'element-plus';
import { ElDialog } from 'element-plus';
import type { FormInstance } from 'element-plus';
import type { RoleState } from '@vben/types';
import { createRoleApi, getRoleListApi, deleteRoleApi, updateRoleApi } from '#/api/core/role';

interface QueryParams {
  name: string;
  roleCode: string;
  status: string;
  pageNum: number;
  pageSize: number;
}

const queryParams = reactive<QueryParams>({
  name: '',
  roleCode: '',
  status: '',
  pageNum: 1,
  pageSize: 10,
});

const total = ref(0);
const roleList = ref([]);
const handleQuery = () => {
  getRoleListApi(queryParams).then((res) => {
    roleList.value = res.records;
    total.value = res.total;
  });
};

handleQuery();

const resetQuery = () => {
  queryParams.name = '';
  queryParams.roleCode = '';
  queryParams.status = '';
  handleQuery();
};

const handleAssignPermission = (row: any) => {
  // TODO: 实现分配权限逻辑
};

const handleDelete = (row: any) => {
  deleteRoleApi(row.id).then(() => {
    ElMessage.success('删除成功');
    handleQuery(); // 刷新列表
  });
};

const handleSizeChange = (val: number) => {
  queryParams.pageSize = val;
  handleQuery();
};

const handleCurrentChange = (val: number) => {
  queryParams.pageNum = val;
  handleQuery();
};

const dialogVisible = ref(false);
const dialogTitle = ref('新增角色');
const formRef = ref<FormInstance>();
let editId = 0;

const formData = reactive<RoleState>({
  name: '',
  roleKey: '',
  roleSort: 0,
  status: '1',
  description: '',
});

const formRules = {
  name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
  ],
  roleKey: [
    { required: true, message: '请输入角色标识', trigger: 'blur' },
    { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' },
  ],
  roleSort: [{ required: true, message: '请输入角色排序', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }],
};

const handleAdd = () => {
  dialogVisible.value = true;
  dialogTitle.value = '新增角色';
  // 重置表单
  formData.name = '';
  formData.roleKey = '';
  formData.roleSort = 0;
  formData.status = '1';
  formData.description = '';
};

const handleSubmit = async () => {
  if (!formRef.value) return;

  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        if (editId) {
          await updateRoleApi({
            ...formData,
            id: editId,
          });
        } else {
          await createRoleApi(formData);
        }
        ElMessage.success('创建成功');
        dialogVisible.value = false;
        handleQuery(); // 刷新列表
      } catch (error) {
        console.error('创建角色失败:', error);
        ElMessage.error('创建失败');
      }
    }
  });
};

const handleEdit = (row: any) => {
  editId = row.id;
  dialogVisible.value = true;
  formData.name = row.name;
  formData.roleKey = row.roleKey;
  formData.roleSort = row.roleSort;
  formData.status = row.status;
  formData.description = row.description;
  // TODO: 实现编辑角色逻辑
};
</script>
