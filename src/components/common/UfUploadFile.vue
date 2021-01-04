<!--
上传附件组件
-->
<template>
    <div class="uploadArea billView">
        <div class="nav-header">
            <span class="nav-header-tip">{{ title }}</span>
        </div>
        <div class="upload-mian">
            <div class="upload-body">
                <div class="upload-down gov-upload-list gov-upload-list-picture-card clearfix" v-show="fileData.length">
                    <div class="gov-upload-list-item gov-upload-list-item-done" :title="item.name" v-for="item in fileData" :key="item.id">
                        <div class="gov-upload-list-item-info">
                            <span>
                                <a :href="item.url" target="_blank" rel="noopener noreferrer" class="gov-upload-list-item-thumbnail">
                                    <img :src="item.url" :alt="item.name" v-if="item.fileType == 'image/jpeg' || item.fileType == 'image/png' || item.fileType == 'image/gif'" />
                                    <a-icon class="fileicon" type="file" v-else />
                                </a>
                                <span class="file-name ellipse">{{ item.name }}</span>
                            </span>
                        </div>
                        <span class="gov-upload-list-item-actions">
                            <!--<a-icon type="eye-o" @click.stop="handlePreview(item)" />-->
                            <a-icon type="download" @click.stop="download(tableName, item.id)" />
                        </span>
                        <div v-show="!isDisabled">
                            <a-popconfirm title="确定要删除此附件吗?" @confirm="handleRemove(tableName, item.id)" @cancel="fileDelCancel" okText="删除" cancelText="取消">
                                <i class="file-delete">
                                    <s>-</s>
                                </i>
                            </a-popconfirm>
                        </div>
                    </div>
                </div>

                <a-upload-dragger
                    name="file"
                    :multiple="true"
                    :showUploadList="false"
                    :action="action"
                    :data="upfile"
                    @change="handleChange"
                    :beforeUpload="beforeUpload"
                    :disabled="isDisabled"
                    v-if="!isDisabled"
                >
                    <p class="ant-upload-drag-icon">
                        <span class="bdUpload-icons">
                            <a-icon type="cloud-upload" title="将文件拖到此处，或点击上传" />
                            <s>上传</s>
                        </span>
                    </p>
                </a-upload-dragger>
            </div>
        </div>
        <div class="deleteBtn" v-if="showEmpty">
            <a-button @click="clearFiles" :disabled="isDisabled">
                {{ tableName == 'ma_photoupload' ? '清空照片' : '清空附件' }}
            </a-button>
        </div>
        <!-- 附件查看 -->
        <bd-show-file v-if="showFileVisible" :fileBrowseData="fileBrowseData" :menuid="menuid"> </bd-show-file>
    </div>
</template>

<script>
import bdShowFile from './UfShowFile';
import $ from 'jquery'
export default {
    name: 'UfUploadFile',
    /*
     * isDisabled---是否可编辑
     * id---卡片Id
     * showEmpty---显示清空
     * */
    props: ['isDisabled', 'id', 'fileType', 'showEmpty', 'comTitle'], //showEmpty:显示清空，
    components: { bdShowFile },
    data() {
        return {
            baseUrl: '/ma',
            action: 'ma/sys/fileManage/upload',
            upfile: {
                tableName: '',
                id: ''
            },
            fileData: [],
            previewImage: '',
            previewVisible: false,
            title: '',
            showFileVisible: false, // 附件查看
            fileBrowseData: [], // 附件数据源
            sourceName: ['附件'],
            isEncryptSource: {}, // 是否加密
            menuid: '',
            sourceid: [],
            tableName: '' //ma_photoupload 图片，ma_fileupload 附件
        };
    },
    methods: {
        //查询文件
        showFiles(id) {
            let vm = this;
            this.$axios
                .get('/ma/sys/fileManage/showFile', { params: { buzId: id } })
                .then(({ data: result }) => {
                    if (result.flag === 'success') {
                        vm.fileData = result.data[vm.tableName];

                        vm.fileData.forEach((item, i) => {
                            item.uid = item.id;
                            item.status = 'done';
                            item.url = `/ma/sys/fileManage/download?tableName=${vm.tableName}&id=${item.id}`;
                        });
                        this.$emit('fileData', this.fileData);
                    } else {
                        vm.error(result.msg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        beforeUpload(file) {
            if (this.tableName == 'ma_photoupload') {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
                if (!isJPG) {
                    this.$message.error('图片格式不对!');
                    return false;
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('图片最大支持 2MB!');
                    return false;
                }
            }
            return true;
        },
        handleChange(info) {
            //文件上传改变

            //tod
            if (this.tableName == 'ma_photoupload') {
                let photoList = info.fileList;
                /*可以上传的文件 有status */
                photoList = photoList.filter(file => {
                    if (file.status) {
                        return true;
                    }
                    return false;
                });
            }

            if (info.file.status === 'done') {
                this.showFiles(this.id);
            }
        },
        handleCancel() {
            this.previewVisible = false;
        },
        handlePreview(fileItem) {
            this.showFileVisible = false;
            this.$nextTick(() => {
                this.showFileVisible = true;
            });
            //tod
            for (let j = 0; j < this.fileData.length; j++) {
                let subIndex = this.fileData[j].name.indexOf('.');
                this.fileData[j].extName = this.fileData[j].name.substr(subIndex);
            }
            let subInd = fileItem.name.indexOf('.');
            fileItem.extName = fileItem.name.substr(subInd);

            const listData = {};
            listData[0] = this.fileData;
            this.fileBrowseData = {
                list: listData,
                file: fileItem,
                sourceId: this.sourceid,
                sourceName: this.sourceName,
                isEncryptSource: this.isEncryptSource || '0'
            };
        },
        handleRemove(tableName, id) {
            var params = new URLSearchParams();
            params.append('tableName', tableName);
            params.append('id', id);
            this.$axios
                .post('/ma/sys/fileManage/del', params)
                .then(({ data: result }) => {
                    if (result.flag === 'success') {
                        this.$message.success('删除成功！');
                        this.showFiles(this.id);
                    } else {
                        this.error(result.msg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        fileDelCancel() {
            this.$message.warning('取消删除');
        },
        //下载文件
        download(table, id) {
            var form = $('<form>');
            form.attr('style', 'display:none');
            form.attr('target', '');
            form.attr('method', 'get');
            form.attr('action', this.baseUrl + '/sys/fileManage/download');
            var input1 = $('<input>');
            input1.attr('type', 'hidden');
            input1.attr('name', 'tableName');
            input1.attr('value', table);
            var input2 = $('<input>');
            input2.attr('type', 'hidden');
            input2.attr('name', 'id');
            input2.attr('value', id);
            $('body').append(form);
            /*将表单放置在web中*/
            form.append(input1);
            form.append(input2);
            form.submit();
            /*表单提交*/
        },
        clearList() {
            this.fileData = [];
        },
        clearFiles() {
            if (this.fileData.length === 0) {
                let msg = this.tableName === 'ma_photoupload' ? '暂无照片' : '暂无附件';
                this.$message.warning(msg);
                return;
            }
            const vm = this;
            vm.$confirm({
                title: '提示框',
                content: '确认清空?',
                onOk() {
                    vm.fileData = [];
                    let params = new URLSearchParams();
                    params.append('tableName', vm.tableName);
                    params.append('buzId', vm.id);
                    this.$axios
                        .post('/ma/sys/fileManage/empty', params)
                        .then(({ data: result }) => {
                            if (result.flag === 'success') {
                                vm.success('清空成功！');
                                vm.$emit('fileData', vm.fileData);
                            } else {
                                vm.error(result.msg);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                },
                onCancel() {}
            });
        }
    },
    watch: {
        id(newId, oldId) {
            if (newId) {
                this.upfile.id = newId;
                this.showFiles(newId);
                this.sourceid = [];
                this.sourceid.push(newId);
            }
        },
        isDisabled(newId, oldId) {
            if (newId) {
                this.title = this.tableName == 'ma_fileupload' ? '附件' : '图片';
            } else {
                this.title = this.tableName == 'ma_fileupload' ? '上传附件' : '上传图片';
            }
            if (this.comTitle) {
                this.title = this.comTitle;
            }
        }
    },
    mounted() {
        this.tableName = this.fileType ? this.fileType : 'ma_fileupload';
        if (this.tableName == 'ma_fileupload') {
            this.title = this.isDisabled ? '附件' : '上传附件';
        } else {
            this.title = this.isDisabled ? '图片' : '上传图片';
        }
        if (this.comTitle) {
            this.title = this.comTitle;
        }
        this.upfile.id = this.id;
        this.upfile.tableName = this.tableName;
        this.showFiles(this.id);
        this.sourceid = [];
        this.sourceid.push(this.id);
    }
};
</script>
<style lang="less">
    .clearfix {
        zoom: 1;
    }

    .clearfix:after, .clearfix:before {
        content: "";
        display: table;
    }
    .billView {
        margin-top: 16px;
        margin-left: 2px;
        border-radius: 4px;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.2);
        background-color: #fff;
    }
    .nav-header {
        width: 100%;
        padding: 8px 0;
        border-left: 4px solid #06f;
        border-radius: 4px 0 0 0;
        border-bottom: 1px solid #ccc;
        height: auto;
        line-height: normal;

        .nav-header-tip {
            padding: 0 8px;
            color: #333333;
        }
    }
    .ellipse {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
    }
    .upload-mian {
        width: 100%;
        padding-top: 10px;
        padding-bottom: 10px;

        .upload-body {
            height: auto;
            min-height: 150px;
            border: 1px solid #bbb;
            border-radius: 4px;
            margin: 10px;
            padding: 15px;
            padding-bottom: 20px;

            .ant-upload-drag {
                // height: 140px;
                // margin-bottom: 10px;
                width: 100px;
                height: 104px;
                border: 1px dashed #979797;
                background-color: #fbfbfb;
                border-radius: 6px;
                box-sizing: border-box;
                display: inline-block;

                .ant-upload-drag-icon {
                    width: 100px;
                    height: 104px;
                    align-items: center;
                    margin-bottom: 20px;
                    display: flex;
                    -ms-flex-pack: distribute;
                    justify-content: space-around;
                    -ms-flex-wrap: wrap;
                    flex-wrap: wrap;

                    .bdUpload-icons {
                        i.anticon {
                            color: #0066ff;
                            font-size: 26px;
                        }

                        s {
                            font-size: 12px;
                            display: block;
                            color: #0066ff;
                            text-decoration: none;
                        }

                        &:hover s {
                            color: red !important;
                        }

                        &:hover i {
                            color: red !important;
                        }
                    }
                }

                .ant-upload {
                    padding: 0;
                }
            }

            .ant-upload-drag.ant-upload-disabled {
                .ant-upload-drag-icon {
                    .bdUpload-icons {
                        pointer-events: none;
                    }
                }
            }

            .upload-up {
                width: 100%;
                height: 150px;
                text-align: center;
                font-size: 36px;
                margin-bottom: 10px;

                .upload-content {
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    color: #999;

                    .upload-left {
                        height: 100%;
                        line-height: 130px;

                        i.icon-icon-plus {
                            font-size: 36px;
                        }
                    }

                    .upload-right {
                        margin-left: 15px;
                        padding-top: 42px;

                        span {
                            font-size: 14px;
                            display: block;
                            width: 130px;
                            height: 24px;
                            line-height: 24px;
                        }
                    }
                }
            }

            .upload-down {
                float: none;
                a {
                    max-height: 68px;
                }

                .file-name {
                    display: block;
                    width: 80%;
                    margin: 0 auto;
                    display: block;
                    text-align: center;
                }

                ul {
                    height: 150px;
                    overflow-y: auto;
                    padding-top: 10px;

                    li {
                        width: 100px;
                        height: 100px;
                        border: 1px solid #bbb;
                        text-align: center;
                        position: relative;
                        margin-right: 10px;
                        margin-bottom: 10px;

                        .del {
                            width: 0;
                            height: 0;
                            border-top: 25px solid #666;
                            border-left: 25px solid transparent;
                            position: absolute;
                            top: 0;
                            right: 0;

                            .anticon-minus {
                                position: absolute;
                                top: -23px;
                                right: 1px;
                                font-size: 12px;
                                color: #fff;
                            }
                        }

                        .del:hover {
                            border-top: 25px solid #ff0000;
                        }

                        .anticon-file {
                            font-size: 28px;
                            color: #666;
                            display: block;
                            margin-top: 20px;
                        }

                        .file-name {
                            width: 100%;
                            display: block;
                            padding: 5px 2px;
                        }
                    }
                }

                i.file-delete {
                    position: absolute;
                    top: 0;
                    right: 0;
                    cursor: pointer;
                    z-index: 10;

                    s {
                        position: absolute;
                        top: -20px;
                        right: 1px;
                        font-size: 32px;
                        color: #fff;
                    }
                }

                i.file-delete:before {
                    content: '';
                    display: block;
                    width: 0;
                    height: 0;
                    border-top: 22px solid #409eff;
                    border-left: 22px solid transparent;
                    position: absolute;
                    top: 0;
                    right: 0;
                }

                .file-delete:hover:before {
                    border-top: 22px solid red;
                }
            }
            .gov-upload-list-picture-card .gov-upload-list-item:hover,
            .gov-upload-list-picture .gov-upload-list-item:hover {
                background: transparent;
            }
            .gov-upload-list-picture-card .gov-upload-list-item:hover .gov-upload-list-item-info,
            .gov-upload-list-picture .gov-upload-list-item:hover .gov-upload-list-item-info {
                background: transparent;
            }
            .gov-upload-list-picture-card .gov-upload-list-item:hover .gov-upload-list-item-info:before {
                opacity: 1;
            }
            .gov-upload-list-picture-card .gov-upload-list-item-actions:hover,
            .gov-upload-list-picture-card .gov-upload-list-item-info:hover+.gov-upload-list-item-actions {
                opacity: 1;
            }
            .gov-upload-list-picture-card {
                .gov-upload-list-item {
                    float: left;
                    width: 104px;
                    height: 104px;
                    margin: 0 8px 8px 0;
                    border-radius: 4px;
                    border: 1px solid #d9d9d9;
                    position: relative;
                }
                .gov-upload-list-item-info {
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                    transition: background-color .3s;
                }
                .gov-upload-list-item-info:before {
                    content: " ";
                    position: absolute;
                    z-index: 1;
                    background-color: rgba(0,0,0,.5);
                    -webkit-transition: all .3s;
                    transition: all .3s;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                }
                .gov-upload-list-item-info>span {
                    height: 60%;
                    display: block;
                }

                .gov-upload-list-item-thumbnail,
                .gov-upload-list-item-thumbnail img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    position: static;
                    top: 8px;
                    left: 8px;
                    text-align: center;
                    line-height: 54px;
                    font-size: 26px;
                    opacity: .8;
                }
                .gov-upload-list-item-actions {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    -webkit-transform: translate(-50%,-50%);
                    transform: translate(-50%,-50%);
                    z-index: 10;
                    white-space: nowrap;
                    opacity: 0;
                    -webkit-transition: all .3s;
                    transition: all .3s;

                    .anticon-download,
                    .anticon-eye-o {
                        z-index: 10;
                        transition: all .3s;
                        cursor: pointer;
                        font-size: 25px;
                        width: 16px;
                        color: hsla(0,0%,100%,.85);
                        margin: 0 8px;
                    }
                }
            }
        }
    }
</style>
