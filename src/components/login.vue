<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="账号">
                <el-input v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name: 'login',
    data() {
        return {
            form:{
                account:'',
                password:''
            }
        }
    },
    created() {},
    methods: {
        onSubmit() {
            this.$axios.post('api/Login/Login',this.form)
            .then(response=>{
                console.log(response)
                debugger
                sessionStorage.setItem("Authorization",response.data.token)
                this.$router.push(router.currentRoute.fullPath)
            }).catch(function(e){
                console.log(e)
            })
        }
    }
}
</script>
<style scoped>

</style>