<!--
附件预览
-->
<template>
    <div>
        <div class="screen bdShowFile" v-if="fileShowFlag">
            <div :class="{'screen_elastic':true, 'full':fullFlag,'full_exit':!fullFlag}">
                <div class="top_title_file_show">
                    <div class="title_file_show">附件预览</div>
                    <div class="close_file_show">
                        <a-icon type="close" @click="close"/>
                    </div>
                    <div class="fullscreen_file_show" v-if="!fullFlag" @click="full">
                        <a-icon type="fullscreen"/>
                    </div>
                    <div class="fullscreen_file_show" v-if="fullFlag" @click="fullExit">
                        <a-icon type="fullscreen-exit"/>
                    </div>
                </div>
                <div class="content_file">
                    <div class="leftDiv">
                        <a-button class="downButton" type="primary" @click="loadAll">下载全部</a-button>
                        <p class="sumP">{{`共${sumCount}张`}}</p>
                        <div style="clear:both"></div>
                        <div class="leftContent">
                            <div v-for="(item,index) in fileBrowseData.list" :key="index">
                                <p
                                        class="titleList"
                                        v-if="item&&item.length>0"
                                >{{sourceName[index]}}</p>
                                <a-list v-if="item&&item.length>0" :dataSource="item">
                                    <a-list-item
                                            slot="renderItem"
                                            slot-scope="item, index"
                                            key="item.id"
                                            @click="chooseFileId(item)"
                                            :class="item.id===chooseId?'chooseFile':''"
                                    >
                                        <span
                                                class="title_span"
                                                :style="browserTypeIE8==='0'?'width:120px':'width:140px'"
                                                :title="item.name"
                                        >{{item.name}}</span>
                                        <a-icon
                                                class="downLoad"
                                                @click.stop="load(item.id,item.name,index)"
                                                type="download"
                                        />
                                    </a-list-item>
                                </a-list>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="imageLeft">
                            <a-icon
                                    type="left-circle"
                                    theme="filled"
                                    @click="goPrevious"
                                    class="action"
                            />
                        </div>
                        <div class="imageCenter">
                            <iframe
                                    v-if="browserTypeIE8==='1'"
                                    :src="`static/pdf/web/viewercopy.html?file=${encodeURIComponent(fileUrl)}`"
                                    frameborder="0"
                                    scrolling="yes"
                                    width="100%"
                                    height="100%"
                            ></iframe>
                            <iframe
                                    id="iframe"
                                    v-if="browserTypeIE8==='0'"
                                    :src="fileUrl"
                                    frameborder="0"
                                    scrolling="yes"
                                    width="100%"
                                    height="100%"
                            ></iframe>
                            <div
                                    v-if="spinVisable"
                                    style="position: absolute;left: 0px;top: 0px;width:100%;height:100%;background: rgba(0,0,0,0.50)"
                            >
                                <a-spin style="margin-top:25%;margin-left:48%"/>
                            </div>
                            <div
                                    v-if="noSelect"
                                    style="position: absolute;left: 0px;top: 0px;width:100%;height:100%;background: rgba(255,255,255,1)"
                            >
                                <div
                                        style="width:24%;height:20%;text-align:center;margin-left:38%;margin-top:15%"
                                >
                                    <img src="../../assets/imgs/noslect.png" width="20%"/>
                                    <br/>
                                    <span
                                            style="margin-top:10px;font-size:18px;font-weight:700"
                                    >该文件暂不支持查看</span>
                                </div>
                            </div>
                        </div>
                        <div class="imageRight">
                            <a-icon
                                    type="right-circle"
                                    theme="filled"
                                    @click="goNext"
                                    class="action"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ["fileBrowseData", "menuid"],
        data() {
            return {
                fileShowFlag: true, // 显示打开
                fullFlag: false, // 是否全屏
                fileVisable: true,
                data: [],
                chooseId: "",
                fileUrl: "",
                checkCount: 0,
                sumCount: 0,
                sourceName: "",
                browserTypeIE8: "1",
                spinVisable: false, // 低版本浏览器下显示得load
                noSelect: false, // 提示不能预览得框
                fileType: ['.doc', '.docx', '.jpg', '.jpeg', '.png', '.bmp', '.pdf', '.gif', '.xlsx', '.xls', '.ppt', '.pptx', '.txt'], // 可以查看的文件类型
                // fileType: ["image/jpeg", "image/png", "image/Gif","application/pdf"], // 可以查看的文件类型
                isEncryptSource: {},
                sourceId: []
            };
        },
        // 下载数据
        created() {
            console.log("fileBrowseData", this.fileBrowseData);
            if (!this.getIE()) {
                this.browserTypeIE8 = "0";
            }
            this.chooseId = this.fileBrowseData.file.id;
            localStorage.setItem(
                "choosefile",
                JSON.stringify(this.fileBrowseData.file)
            );
            //tod
            if (this.fileType.indexOf(this.fileBrowseData.file.extName.toLowerCase()) === -1) {
                // if (this.fileType.indexOf(this.fileBrowseData.file.fileType) === -1) {
                this.spinVisable = false;
                this.noSelect = true;
            }
            this.sourceName = this.fileBrowseData.sourceName;
            // this.sourceId = this.fileBrowseData.sourceId
            this.isEncryptSource = this.fileBrowseData.isEncryptSource;
            // let fileUrl = `/pvdf/billattachment/previewFile/${this.fileBrowseData.file.id}/${this.fileBrowseData.isEncryptSource[this.fileBrowseData.file.sourceId] || '0'}?type=${this.browserTypeIE8}`
            let fileUrl = `/ma/sys/fileManage/previewFile?id=${this.fileBrowseData.file.id}`;
            this.fileUrl = this.setUrl(fileUrl);
            for (let key in this.fileBrowseData.list) {
                for (let j = 0; j < this.fileBrowseData.list[key].length; j++) {
                    this.data.push(this.fileBrowseData.list[key][j]);
                }
            }
            this.sumCount = this.data.length;
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].id === this.chooseId) {
                    this.checkCount = i;
                }
            }
        },
        // 挂载
        mounted() {
            // $('.file .ant-modal-content .ant-modal-footer').remove()
            if (this.browserTypeIE8 === "0") {
                this.spinVisable = true;
                var iframe = document.getElementById("iframe");
                iframe.onload = () => {
                    if (this.browserTypeIE8 === "0") {
                        this.spinVisable = false;
                    }
                };
            }
        },
        // 事件
        methods: {
            full() {
                this.fullFlag = true;
            },
            fullExit() {
                this.fullFlag = false;
            },
            close() {
                this.fileShowFlag = false;
            },
            setUrl(url) {
                const productCode = localStorage.getItem(
                    this.menuid + "productCode"
                );
                if (
                    productCode !== undefined &&
                    productCode !== "undefined" &&
                    productCode !== null
                ) {
                    url = url + "&productCode=" + encodeURI(productCode);
                }
                // 增加开启日志功能
                //tod
                /* if (isOperationLog.IS_OPERATION_LOG) {
            url = `${url}&isOperationLog=1&menuid=${this.menuid}`
          } */
                return url;
            },
            chooseFileId(item) {
                this.chooseId = item.id;
                localStorage.setItem("choosefile", JSON.stringify(item));
                // let fileUrl = `/pvdf/billattachment/previewFile/${item.id}/${this.fileBrowseData.isEncryptSource[sourceId] || '0'}?type=${this.browserTypeIE8}`
                let fileUrl = `/ma/sys/fileManage/previewFile?id=${item.id}`;
                this.fileUrl = this.setUrl(fileUrl);
                if (this.browserTypeIE8 === "0") {
                    this.spinVisable = true;
                }
                for (let i = 0; i < this.data.length; i++) {
                    if (this.data[i].id === this.chooseId) {
                        this.checkCount = i;
                    }
                }
                if (this.fileType.indexOf(item.extName.toLowerCase()) === -1) {
                    this.spinVisable = false;
                    this.noSelect = true;
                } else {
                    this.noSelect = false;
                }
            },
            loadAll() {
                for (let key in this.fileBrowseData.list) {
                    for (let i = 0; i < this.fileBrowseData.list[key].length; i++) {
                        this.download(
                            this.data[i].name,
                            `/ma/sys/fileManage/download?tableName=ma_fileupload&id=${this.fileBrowseData.list[key][i].id}`
                        );
                    }
                }
            },
            load(id, name, index) {
                this.download(
                    name,
                    `/ma/sys/fileManage/download?tableName=ma_fileupload&id=${id}`
                );
            },
            download(name, href) {
                var file = document.createElement("a"); // 创建a标签
                var e = document.createEvent("MouseEvents"); // 创建鼠标事件对象
                e.initEvent("click", false, false); // 初始化事件对象
                file.href = href; // 设置下载地址
                file.download = name; // 设置下载文件名
                file.dispatchEvent(e); // 给指定的元素，执行事件click事件
            },
            goPrevious() {
                if (this.checkCount === 0) {
                    // 第1条默认跳到最后一条
                    this.checkCount = this.data.length - 1;
                } else {
                    this.checkCount = this.checkCount - 1;
                }
                if (this.browserTypeIE8 === "0") {
                    this.spinVisable = true;
                }
                let sourceIndex;
                this.chooseId = this.data[this.checkCount].id;
                for (let key in this.fileBrowseData.list) {
                    for (let i = 0; i < this.fileBrowseData.list[key].length; i++) {
                        if (this.fileBrowseData.list[key][i].id === this.chooseId) {
                            sourceIndex = parseInt(key);
                        }
                    }
                }
                localStorage.setItem(
                    "choosefile",
                    JSON.stringify(this.data[this.checkCount])
                );
                // let fileUrl = `/pvdf/billattachment/previewFile/${this.chooseId}/${this.isEncryptSource[this.sourceId[sourceIndex]] || '0'}?type=${this.browserTypeIE8}`
                let fileUrl = `/ma/sys/fileManage/previewFile?id=${this.chooseId}`;
                this.fileUrl = this.setUrl(fileUrl);
                if (
                    this.fileType.indexOf(this.data[this.checkCount].extName.toLowerCase()) ===
                    -1
                ) {
                    this.spinVisable = false;
                    this.noSelect = true;
                } else {
                    this.noSelect = false;
                }
            },
            goNext() {
                if (this.checkCount === this.data.length - 1) {
                    // 最后一条默认跳到第1条
                    this.checkCount = 0;
                } else {
                    this.checkCount = this.checkCount + 1;
                }
                if (this.browserTypeIE8 === "0") {
                    this.spinVisable = true;
                }
                this.chooseId = this.data[this.checkCount].id;
                let sourceIndex;
                for (let key in this.fileBrowseData.list) {
                    for (let i = 0; i < this.fileBrowseData.list[key].length; i++) {
                        if (this.fileBrowseData.list[key][i].id === this.chooseId) {
                            sourceIndex = parseInt(key);
                        }
                    }
                }
                localStorage.setItem(
                    "choosefile",
                    JSON.stringify(this.data[this.checkCount])
                );
                // let fileUrl = `/pvdf/billattachment/previewFile/${this.chooseId}/${this.isEncryptSource[this.sourceId[sourceIndex]] || '0'}?type=${this.browserTypeIE8}`
                let fileUrl = `/ma/sys/fileManage/previewFile?id=${this.chooseId}`;
                this.fileUrl = this.setUrl(fileUrl);
                if (
                    this.fileType.indexOf(this.data[this.checkCount].extName.toLowerCase()) ===
                    -1
                ) {
                    this.spinVisable = false;
                    this.noSelect = true;
                } else {
                    this.noSelect = false;
                }
            },
            getIE() {
                let DEFAULT_VERSION = 4;
                let ua = navigator.userAgent.toLowerCase();
                console.log("浏览器版本查看", ua);
                let isIE = ua.indexOf("chrome") > -1;
                let safariVersion = 0;
                if (isIE) {
                    let verstion = ua.split("chrome/")[1];
                    safariVersion = parseInt(verstion.substr(0, 1));
                }
                if (safariVersion <= DEFAULT_VERSION) {
                    // this.browserTypeIE8 = '0'
                    return false;
                } else {
                    return true;
                }
            }
        },
        components: {},
        watch: {}
    };
</script>

<style lang="less">
    .screen {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2000;
        overflow-y: auto;
    }

    .bdShowFile {
        .full {
            width: 100%;
            height: 100%;
        }

        .full_exit {
            width: 70%;
            height: 500px;
            border-radius: 5px;
            left: 50%;
            margin-left: -35%;
            top: 50%;
            margin-top: -250px;
        }

        .screen_elastic {
            position: absolute;
            background: #fff;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }

        .close_file_show {
            font-size: 20px;
            float: right;
            color: rgba(0, 0, 0, 0.45);
            margin-top: -30px;
            margin-right: 20px;
        }

        .close_file_show :hover {
            color: rgba(0, 0, 0, 0.65);
        }

        .fullscreen_file_show {
            font-size: 20px;
            float: right;
            color: rgba(0, 0, 0, 0.45);
            margin-right: 55px;
            margin-top: -30px;
            cursor: pointer;
        }

        .fullscreen_file_show :hover {
            color: rgba(0, 0, 0, 0.65);
        }

        .top_title_file_show {
            position: relative;
            width: 100%;
            height: 40px;
            line-height: 0;
            border-bottom: none;
            background-color: #f4f4f3 !important;
            margin: 0;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }

        .title_file_show {
            position: relative;
            color: rgba(0, 0, 0, 0.85);
            font-weight: 400;
            width: 80px;
            font-size: 16px;
            line-height: 40px;
            padding-top: 0;
            margin-left: 20px;
        }

        .file {
            width: 100% !important;
        }

        .file .ant-modal-content {
            padding: 0 5px;
        }

        .content_file {
            width: 100%;
            height: calc(100% - 70px);
            padding: 16px 10px 0;
        }

        .file .ant-modal-content .ant-modal-body {
            padding: 0;
        }

        .leftDiv {
            position: relative;
            float: left;
            width: 180px;
            height: 100%;
            overflow-y: hidden;
        }

        .chooseFile {
            background-color: #fff !important;
            color: #06f !important;
        }

        .hoverFile:hover {
            background: #d8efff;
        }

        .gov-list-item {
            padding: 8px 0;
        }

        .gov-list-item-content {
            margin-left: 10px;
            margin-right: 10px;
        }

        .right {
            position: relative;
            overflow: hidden;
            height: 100%;
        }

        .imageLeft {
            position: relative;
            float: left;
            width: 8%;
            height: 100%;
        }

        .imageCenter {
            position: relative;
            float: left;
            width: 84%;
            height: 100%;
        }

        .imageRight {
            position: relative;
            float: left;
            width: 8%;
            height: 100%;
        }

        .downButton {
            margin: 10px 0;
            float: left;
            color: #fff !important;
            border-color: #06f !important;
            background-color: #06f !important;
        }

        .downButton:hover {
            background-color: #06f !important;
            opacity: 0.8;
        }

        .sumP {
            float: left;
            font-size: 14px;
            margin-top: 15px;
            margin-left: 5px;
        }

        .ant-list-item {
            padding: 8px 0;
        }

        .ant-list-item-content {
            font-size: 14px;
        }

        .downLoad,
        .editbtn {
            position: absolute;
            right: 0;
            font-size: 16px;
            margin-top: 3px;
            margin-right: 10px;
            cursor: pointer;
        }

        .editbtn {
            right: 21px;
            margin-top: 2px;
        }

        .downLoad :hover,
        .editbtn:hover {
            color: rgba(0, 0, 0, 1);
        }

        .action {
            font-size: 40px;
            text-align: center;
            display: block;
            margin-top: 180px;
            fill: #e9e9e9;
            color: #919191;
        }

        .action :hover {
            fill: #e9e9e9;
            color: #ffffff;
        }

        .title_span {
            width: 120px;
            overflow: hidden;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            white-space: nowrap;
            display: block;
        }

        .titleList {
            padding: 2px 0;
            font-weight: 900;
        }

        .leftContent {
            overflow-y: auto;
            width: 100%;
            height: 100%;
        }
    }

</style>
