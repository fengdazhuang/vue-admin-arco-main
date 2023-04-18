<template>
  <el-row class="row-bg" justify="space-evenly" wrap>
    <el-col :span="8"
      ><div class="grid-content ep-bg-purple" />
      <img src="src\assets\game-img\Water\帆船.jpg" alt="" />
    </el-col>
    <el-col :span="8"
      ><div class="grid-content ep-bg-purple-light" />
      <img src="src\assets\game-img\Water\帆船.jpg" alt="" />
    </el-col>
    <el-col :span="8"
      ><div class="grid-content ep-bg-purple" />
      <img src="src\assets\game-img\Water\帆船.jpg" alt="" />
    </el-col>
    <el-col :span="8"
      ><div class="grid-content ep-bg-purple" />
      <img src="src\assets\game-img\Water\帆船.jpg" alt="" />
    </el-col>
  </el-row>
</template>

<style scoped>
body{
background-color: rgb(248,248,248);
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  border-radius: 4px;
}
img {
  width: 420px;
    height: 520px;

}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
