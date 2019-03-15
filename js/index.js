window.onload = function () {
        /* 
        思路分析
        1 获取到.itemBox 宽度
        2 获取到.item 宽度
        3 求出列数
        4 求出间距
        5 实现瀑布流布局的方法
        6 滚动页面时 加载数据
     */
        // 获取到相关元素
        var itemBox = document.getElementsByClassName('itemBox')[0];
        var items = document.getElementsByClassName('item');
        // 1 获取到.itemBox 宽度
        var itemBoxW = itemBox.offsetWidth;
        // 2 获取到.item 宽度
        var itemW = items[0].offsetWidth;
        // 3 求出列数
        var column = parseInt(itemBoxW / itemW);
        // 4 求出间距
        var distence = (itemBoxW - itemW * column) / (column - 1);
        console.log(distence);
        // 5 实现瀑布流布局的方法
        // 定义一个存储每列高度的容器
        var arr = [];
        waterFull();
        // 6 滚动页面时 加载数据
        window.onscroll = function () {
            if (window.pageYOffset + window.innerHeight > getMin(arr).minV) {
                var json = [
                    { "src": "./img/P_000.jpg" },
                    { "src": "./img/P_001.jpg" },
                    { "src": "./img/P_002.jpg" },
                    { "src": "./img/P_003.jpg" },
                    { "src": "./img/P_004.jpg" },
                    { "src": "./img/P_005.jpg" },
                    { "src": "./img/P_006.jpg" },
                    { "src": "./img/P_007.jpg" },
                    { "src": "./img/P_008.jpg" },
                    { "src": "./img/P_009.jpg" },
                    { "src": "./img/P_010.jpg" }
                ];
                for (var i = 0; i < json.length; i++) {
                    var div = document.createElement('div');
                    div.className = 'item';
                    var img = document.createElement('img');;
                    img.src = json[i].src;
                    div.appendChild(img);
                    itemBox.appendChild(div);
                }
                waterFull();


            }
        }
        // 实现瀑布流布局的方法
        function waterFull() {
            for (var i = 0; i < items.length; i++) {
                if (i < column) {
                    items[i].style.left = (itemW + distence) * i + 'px';
                    arr[i] = items[i].offsetHeight;
                    // console.log(arr);
                } else {
                    var minV = getMin(arr).minV;
                    var minI = getMin(arr).minI;
                    items[i].style.left = (itemW + distence) * minI + 'px';
                    items[i].style.top = minV + distence + 'px';
                    arr[minI] = minV + distence + items[i].offsetHeight;

                }

            }
        }

        // 获取数组的最小值以及索引
        function getMin(arr) {
            var obj = {};
            obj.minV = arr[0];
            obj.minI = 0;
            for (var i = 1; i < arr.length; i++) {
                if (obj.minV > arr[i]) {
                    obj.minV = arr[i];
                    obj.minI = i;
                }
            }
            return obj;
        }

    }