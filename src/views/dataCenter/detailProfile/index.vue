<template>
  <div style="height:100%;">
    <router-view></router-view>   
  </div>
</template>

<style type="text/css" lang="scss">
.detailProfile{
    .classify_searchinfo{
        .timeLine{
            overflow: hidden;
            .currentClick{
                color:#1890ff;
            }
            li{
                float: left;
                font-size: 16px;
                cursor: pointer;
                span{
                    border-right: 1px solid #000 ;
                    padding:0 10px;
                };
            }
            li:last-child span{
                border-right: 0 none;
            } 
        }
    }
        .el-table__header-wrapper{
            tr{
                background:transparent;
                th{
                    background:transparent;
                    padding: 0px;
                    .cell{
                        padding: 0px;
                    }
                }
            }
            .basicColor{
            display:block; 
            background:#eaf0ff;
            }
            .blueColor{
            background:#05BEFF;
            }
            .redColor{
            background:red;
            }
        }
     .TotalH2{
            text-align: center;
            font-size: 28px;
            margin-bottom: 10px;
            position:relative;
        }
     .fixedExcel{
         position:absolute;
         left: 0px;
         top: 0px;
    }
    .caret-wrapper{
        position: absolute;;
        top:9px;
        right: 0px;
    }
    .el-table_1_column_4{
        .caret-wrapper{
        position: absolute;;
        top:9px;
        right: 40px!important;
    }
    }
    
}
</style>