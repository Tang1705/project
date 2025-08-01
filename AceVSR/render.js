// 全局变量
let vsrData = [];
let methodRanks = {};
let metricRanks = {};
let datasetOverallRanks = {};
let currentDataset = "overall";
let fullDataMethodCount = 0; // 三个数据集都包含的方法数量

// 从外部JSON文件加载数据
function loadData() {
    console.log("开始加载数据...");
    // 检查JSON文件路径是否正确
    fetch('vsr_data.json')
        .then(response => {
            console.log("数据请求响应状态:", response.status);
            if (!response.ok) {
                throw new Error(`HTTP错误: ${response.status} - 可能是文件路径错误`);
            }
            return response.json();
        })
        .then(data => {
            console.log("数据加载成功，共", data.length, "条记录");
            vsrData = data;

            // 验证数据格式
            if (!Array.isArray(vsrData) || vsrData.length === 0) {
                throw new Error("数据格式错误，不是有效的数组或为空");
            }

            updateStats();
            calculateFullDataMethodCount();
            metricRanks = calculateMetricRanks();
            methodRanks = calculateOverallRanks();
            updateTopMethods();

            // 初始排序
            const initialSortedData = getInitialSortedData();
            renderTable(initialSortedData);
        })
        .catch(error => {
            console.error('数据加载错误:', error);
            document.getElementById('tableBody').innerHTML =
                `<tr><td colspan="7" class="error"><i class="fas fa-exclamation-triangle"></i><br>数据加载失败: ${error.message}<br>请检查vsr_data.json文件是否存在且格式正确</td></tr>`;
        });
}

// 获取初始排序的数据
function getInitialSortedData() {
    return [...vsrData].sort((a, b) => {
        // 确保Bicubic始终在最后
        if (a.method === "Bicubic") return 1;
        if (b.method === "Bicubic") return -1;

        // 按整体排名排序
        const rankA = methodRanks[a.method] || Number.MAX_SAFE_INTEGER;
        const rankB = methodRanks[b.method] || Number.MAX_SAFE_INTEGER;
        return rankA - rankB;
    });
}

// 更新统计信息
function updateStats() {
    document.getElementById('methodCount').textContent = vsrData.length;

    // 计算最小和最大参数量
    const paramValues = vsrData
        .map(item => parseFloat(item.params))
        .filter(value => !isNaN(value));

    if (paramValues.length > 0) {
        document.getElementById('minParams').textContent = `${Math.min(...paramValues)}M`;
        document.getElementById('maxParams').textContent = `${Math.max(...paramValues)}M`;
    }
}

// 计算三个数据集都包含的方法数量
function calculateFullDataMethodCount() {
    fullDataMethodCount = vsrData.filter(item => {
        // 检查REDS4数据集是否有完整数据
        const hasReds4 = item.reds4_psnr !== '-' && item.reds4_ssim !== '-' &&
            !isNaN(parseFloat(item.reds4_psnr)) && !isNaN(parseFloat(item.reds4_ssim));

        // 检查Vimeo数据集是否有完整数据
        const hasVimeo = item.vimeo_psnr !== '-' && item.vimeo_ssim !== '-' &&
            !isNaN(parseFloat(item.vimeo_psnr)) && !isNaN(parseFloat(item.vimeo_ssim));

        // 检查Vid4数据集是否有完整数据
        const hasVid4 = item.vid4_psnr !== '-' && item.vid4_ssim !== '-' &&
            !isNaN(parseFloat(item.vid4_psnr)) && !isNaN(parseFloat(item.vid4_ssim));

        return hasReds4 && hasVimeo && hasVid4;
    }).length;

    console.log(`三个数据集都包含的方法数量: ${fullDataMethodCount}`);
}

// 计算每个指标的排名（处理并列情况）
function calculateMetricRanks() {
    const metrics = [
        'reds4_psnr', 'reds4_ssim',
        'vimeo_psnr', 'vimeo_ssim',
        'vid4_psnr', 'vid4_ssim'
    ];

    const ranks = {};

    metrics.forEach(metric => {
        // 过滤有效值并排序
        const validEntries = vsrData
            .filter(item => item[metric] !== '-' && !isNaN(parseFloat(item[metric])))
            .map(item => ({
                method: item.method,
                value: parseFloat(item[metric])
            }));

        // 按值降序排序
        validEntries.sort((a, b) => b.value - a.value);

        // 计算排名（处理并列）
        let currentRank = 1;
        let currentValue = null;
        let skipCount = 0;

        ranks[metric] = {};

        validEntries.forEach((entry, index) => {
            if (entry.value !== currentValue) {
                // 新值，更新排名
                currentRank = index + 1 - skipCount;
                currentValue = entry.value;
            }

            // 相同值获得相同排名
            ranks[metric][entry.method] = currentRank;

            // 如果下一个值相同，增加跳过计数
            if (index < validEntries.length - 1 && entry.value === validEntries[index + 1].value) {
                skipCount++;
            } else {
                skipCount = 0;
            }
        });
    });

    return ranks;
}

// 计算基于特定数据集的排名
function calculateDatasetRanks(dataset) {
    const datasetScores = {};
    // 惩罚值 = 三个数据集都包含的方法数量 + 1
    const penaltyRank = fullDataMethodCount + 1;

    // 根据选择的数据集确定指标
    const psnrMetric = `${dataset}_psnr`;
    const ssimMetric = `${dataset}_ssim`;

    // 计算每个方法的平均分
    vsrData.forEach(item => {
        let score = 0;
        let count = 0;

        // 如果PSNR存在
        if (item[psnrMetric] !== '-' && !isNaN(parseFloat(item[psnrMetric]))) {
            score += parseFloat(item[psnrMetric]);
            count++;
        }

        // // 如果SSIM存在
        // if (item[ssimMetric] !== '-' && !isNaN(parseFloat(item[ssimMetric]))) {
        //     score += parseFloat(item[ssimMetric]);
        //     count++;
        // }

        // 如果两个指标都缺失，给予惩罚值
        if (count === 0) {
            datasetScores[item.method] = -1; // 特殊标记
        } else {
            datasetScores[item.method] = score / count;
        }
    });

    // 将方法按平均分排序
    const sortedMethods = Object.keys(datasetScores)
        .map(method => ({method, score: datasetScores[method]}))
        .sort((a, b) => {
            // 处理Bicubic，强制排在最后
            if (a.method === "Bicubic") return 1;
            if (b.method === "Bicubic") return -1;

            // 处理缺失数据：缺失的数据排在前面有数据的之后，但在Bicubic之前
            if (a.score === -1 && b.score === -1) return 0;
            if (a.score === -1) return 1;
            if (b.score === -1) return -1;
            return b.score - a.score;
        });

    // 计算排名（处理并列）
    const ranks = {};
    let currentRank = 1;
    let currentScore = null;
    let skipCount = 0;

    sortedMethods.forEach((entry, index) => {
        // 对Bicubic特殊处理
        if (entry.method === "Bicubic") {
            ranks[entry.method] = sortedMethods.length;
            return;
        }

        // 缺失数据给予惩罚值
        if (entry.score === -1) {
            ranks[entry.method] = penaltyRank;
            return;
        }

        if (entry.score !== currentScore) {
            currentRank = index + 1 - skipCount;
            currentScore = entry.score;
        }

        ranks[entry.method] = currentRank;

        // 如果下一个值相同，增加跳过计数
        if (index < sortedMethods.length - 1 && entry.score === sortedMethods[index + 1].score) {
            skipCount++;
        } else {
            skipCount = 0;
        }
    });

    return ranks;
}

// 计算整体排名
function calculateOverallRanks() {
    // 计算每个数据集上的排名
    const ranksRedS4 = calculateDatasetRanks("reds4");
    const ranksVimeo = calculateDatasetRanks("vimeo");
    const ranksVid4 = calculateDatasetRanks("vid4");

    // 存储每个数据集的整体排名
    datasetOverallRanks.reds4 = ranksRedS4;
    datasetOverallRanks.vimeo = ranksVimeo;
    datasetOverallRanks.vid4 = ranksVid4;

    // 计算每个方法的加权平均排名
    const weightedRanks = {};
    // 惩罚值 = 三个数据集都包含的方法数量 + 1
    const penaltyRank = fullDataMethodCount + 1;
    let totalLength = vsrData.length + 1;


    vsrData.forEach(item => {
        // 对Bicubic特殊处理
        if (item.method === "Bicubic") {
            weightedRanks[item.method] = Infinity;
            return;
        }
        let penaltyWeight=0.1;
        let redsWeight=0.4;
        let vimeoWeight=0.3;
        let vidWeight = 0.2;

        if ((ranksRedS4[item.method] + ranksVimeo[item.method] + ranksVid4[item.method]) === 1) {
            penaltyLength = totalLength;
        } else if ((ranksRedS4[item.method] + ranksVimeo[item.method] + ranksVid4[item.method]) === 2) {
            penaltyLength = 0.5*totalLength;
        } else {
            penaltyLength = 0;
        }


        // 获取每个数据集的排名，如果缺失则使用惩罚值
        const reds4Rank = ranksRedS4[item.method] || penaltyRank;
        const vimeoRank = ranksVimeo[item.method] || penaltyRank;
        const vid4Rank = ranksVid4[item.method] || penaltyRank;

        // 应用加权计算
        const weightedRank = (reds4Rank * redsWeight) + (vimeoRank * vimeoWeight) + (vid4Rank * vidWeight) + penaltyWeight * penaltyLength;
        weightedRanks[item.method] = weightedRank;
    });

    // 将方法按加权排名排序
    const sortedMethods = Object.keys(weightedRanks)
        .map(method => ({method, rank: weightedRanks[method]}))
        .sort((a, b) => a.rank - b.rank);

    // 计算最终排名（处理并列）
    const ranks = {};
    let currentRank = 1;
    let currentWeightedRank = null;
    let skipCount = 0;

    sortedMethods.forEach((entry, index) => {
        // 对Bicubic特殊处理
        if (entry.method === "Bicubic") {
            ranks[entry.method] = sortedMethods.length;
            return;
        }

        if (Math.abs(entry.rank - currentWeightedRank) > 0.001) {
            currentRank = index + 1 - skipCount;
            currentWeightedRank = entry.rank;
        }

        ranks[entry.method] = currentRank;

        // 如果下一个值相同，增加跳过计数
        if (index < sortedMethods.length - 1 &&
            Math.abs(entry.rank - sortedMethods[index + 1].rank) <= 0.001) {
            skipCount++;
        } else {
            skipCount = 0;
        }
    });

    return ranks;
}

// 更新顶部前三名显示
function updateTopMethods() {
    const topMethodsContainer = document.getElementById('topMethodsContainer');
    topMethodsContainer.innerHTML = '';

    // 创建排名与方法的映射
    const rankToMethods = {};
    Object.keys(methodRanks).forEach(method => {
        // 排除Bicubic
        if (method === "Bicubic") return;

        const rank = methodRanks[method];
        if (!rankToMethods[rank]) {
            rankToMethods[rank] = [];
        }
        rankToMethods[rank].push(method);
    });

    // 获取前三名方法
    const topRanks = Object.keys(rankToMethods)
        .map(Number)
        .sort((a, b) => a - b)
        .filter(rank => rank <= 3);

    // 只显示前三名
    const displayRanks = topRanks.slice(0, 3);

    displayRanks.forEach((rank, index) => {
        const methods = rankToMethods[rank];
        const methodName = methods[0];

        const topMethod = document.createElement('div');
        topMethod.className = `top-method ${
            index === 0 ? 'first' :
                index === 1 ? 'second' : 'third'
        }`;

        topMethod.innerHTML = `
                <i class="${
            index === 0 ? 'fas fa-crown' :
                index === 1 ? 'fas fa-medal' : 'fas fa-medal'
        }"></i> 
                ${methodName}
            `;

        topMethodsContainer.appendChild(topMethod);
    });
}

// DOM元素
const tableBody = document.getElementById('tableBody');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const datasetButtons = document.querySelectorAll('.dataset-btn');
const tableHeaders = document.querySelectorAll('th[data-sort]');

// 渲染表格函数
function renderTable(data) {
    console.log("开始渲染表格，数据量:", data.length);
    tableBody.innerHTML = '';

    if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" class="empty-row">未找到匹配的方法，请尝试调整搜索条件或筛选条件</td></tr>`;
        return;
    }

    // 使用传入的已排序数据
    data.forEach(item => {
        const row = document.createElement('tr');
        row.classList.add('fade-in');

        // 获取方法的整体排名
        const overallRank = methodRanks[item.method] || 0;

        // 创建排名徽章
        let rankBadge = '';
        if (overallRank === 1) {
            rankBadge = `<span class="rank-badge rank-1">${overallRank}</span>`;
        } else if (overallRank === 2) {
            rankBadge = `<span class="rank-badge rank-2">${overallRank}</span>`;
        } else if (overallRank === 3) {
            rankBadge = `<span class="rank-badge rank-3">${overallRank}</span>`;
        } else if (overallRank > 0) {
            rankBadge = `<span class="rank-badge rank-other">${overallRank}</span>`;
        }

        // 创建方法名称，对Bicubic添加特殊标记
        let methodNameClass = item.method === "Bicubic" ? "font-weight-bold text-gray-500" : "";
        const methodName = `<div class="method-name ${methodNameClass}">${item.method}</div>`;

        // 创建链接部分
        let links = '';

        // 论文链接
        if (item.reference) {
            links += `<a href="${item.reference}" target="_blank" class="method-link">
                    <i class="fas fa-file-pdf"></i> 论文
                </a>`;
        }

        // 代码仓库链接
        if (item.link) {
            links += `<a href="${item.link}" target="_blank" class="method-link">
                    <i class="fab fa-github"></i> 代码
                </a>`;
        } else {
            links += `<span class="method-link"><i class="fas fa-ban"></i> 无代码</span>`;
        }

        const methodCell = `<div class="method-cell">
                ${methodName}
                <div class="method-link-group">${links}</div>
            </div>`;

        // 创建数据集指标单元格
        const createMetricCell = (psnr, ssim, metricPrefix) => {
            // 获取PSNR和SSIM的排名
            const psnrRank = metricRanks[`${metricPrefix}_psnr`]?.[item.method] || 0;
            const ssimRank = metricRanks[`${metricPrefix}_ssim`]?.[item.method] || 0;
            // 获取数据集整体排名
            const datasetRank = datasetOverallRanks[metricPrefix]?.[item.method] || 0;

            // 确定排名类
            const getRankClass = (rank) => {
                if (rank === 1) return 'first rank-sup-1';
                if (rank === 2) return 'second rank-sup-2';
                if (rank === 3) return 'third rank-sup-3';
                return 'other rank-sup-other';
            };

            const psnrClass = getRankClass(psnrRank);
            const ssimClass = getRankClass(ssimRank);

            // 生成排名角标
            const psnrRankSup = psnrRank > 0 ?
                `<span class="rank-sup ${psnrClass.split(' ')[1]}">${psnrRank}</span>` : '';
            const ssimRankSup = ssimRank > 0 ?
                `<span class="rank-sup ${ssimClass.split(' ')[1]}">${ssimRank}</span>` : '';

            // 高亮当前数据集
            const isActiveDataset = currentDataset === metricPrefix;
            const highlightClass = isActiveDataset ? "highlight-dataset" : "";

            // 处理缺失数据
            const psnrDisplay = psnr === '-' ? '<span class="data-missing">N/A</span>' : psnr;
            const ssimDisplay = ssim === '-' ? '<span class="data-missing">N/A</span>' : ssim;

            return `
                    <td class="metric-cell ${highlightClass}">
                        <div class="metric-value">
                            <span class="${psnrClass.split(' ')[0]}">${psnrDisplay}</span>${psnrRankSup} / 
                            <span class="${ssimClass.split(' ')[0]}">${ssimDisplay}</span>${ssimRankSup}
                        </div>
                    </td>
                `;
        };

        // 创建表格行
        row.innerHTML = `
                <td>${rankBadge}</td>
                <td>${methodCell}</td>
                <td>${item.frames}</td>
                <td class="params-cell">${item.params}</td>
                ${createMetricCell(item.reds4_psnr, item.reds4_ssim, 'reds4')}
                ${createMetricCell(item.vimeo_psnr, item.vimeo_ssim, 'vimeo')}
                ${createMetricCell(item.vid4_psnr, item.vid4_ssim, 'vid4')}
            `;

        tableBody.appendChild(row);
    });
}

// 搜索功能
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = vsrData.filter(item =>
        item.method.toLowerCase().includes(searchTerm)
    );
    renderTable(filteredData);
});

// 筛选功能
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.dataset.filter;
        let filteredData;

        switch (filter) {
            case 'recent':
                filteredData = vsrData.filter(item => item.year >= 2023);
                break;
            case 'lightweight':
                filteredData = vsrData.filter(item => {
                    const params = parseFloat(item.params);
                    return !isNaN(params) && params < 10;
                });
                break;
            case 'top':
                filteredData = vsrData.filter(item => {
                    // 排除Bicubic
                    if (item.method === "Bicubic") return false;

                    const rank = methodRanks[item.method] || 0;
                    return rank > 0 && rank <= 3;
                });
                break;
            default:
                filteredData = vsrData;
        }

        // 对筛选后的数据进行排序
        const sortedFilteredData = [...filteredData].sort((a, b) => {
            if (a.method === "Bicubic") return 1;
            if (b.method === "Bicubic") return -1;
            const rankA = methodRanks[a.method] || Number.MAX_SAFE_INTEGER;
            const rankB = methodRanks[b.method] || Number.MAX_SAFE_INTEGER;
            return rankA - rankB;
        });

        renderTable(sortedFilteredData);
    });
});

// 数据集选择功能
datasetButtons.forEach(button => {
    button.addEventListener('click', () => {
        datasetButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        currentDataset = button.dataset.dataset;

        if (currentDataset === "overall") {
            methodRanks = calculateOverallRanks();
        } else {
            methodRanks = calculateDatasetRanks(currentDataset);
        }

        updateTopMethods();
        // 切换数据集后重新排序
        const sortedData = getInitialSortedData();
        renderTable(sortedData);
    });
});

// 排序功能
// 排序功能 - 修改为默认降序
let currentSort = {column: null, direction: 'desc'}; // 默认方向改为降序

tableHeaders.forEach(header => {
    header.addEventListener('click', () => {
        if (header.dataset.sort === 'method' || header.dataset.sort === 'frames') {
            return;
        }
        const column = header.dataset.sort;
        // 反转逻辑：如果当前列已排序且是降序，则切换为升序，否则保持默认降序
        const isDesc = currentSort.column === column && currentSort.direction === 'desc';
        const direction = isDesc ? 'asc' : 'desc'; // 首次点击默认降序

        // 更新排序状态
        currentSort = {column, direction};

        // 重置所有表头图标
        tableHeaders.forEach(h => {
            h.classList.remove('sorted', 'asc', 'desc');
            const icon = h.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-sort';
            }
        });

        // 设置当前表头图标
        header.classList.add('sorted', direction);
        const currentIcon = header.querySelector('i');
        if (currentIcon) {
            currentIcon.className = direction === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
        }

        // 移除排序类
        tableHeaders.forEach(h => h.classList.remove('sorted', 'asc', 'desc'));

        // 添加排序类和方向
        header.classList.add('sorted', direction);


        // 排序数据
        const sortedData = [...vsrData].sort((a, b) => {
            // 确保Bicubic始终排在最后
            if (a.method === "Bicubic") return 1;
            if (b.method === "Bicubic") return -1;

            // 处理 "rank" 字段
            if (column === 'rank') {
                const rankA = methodRanks[a.method] || Number.MAX_SAFE_INTEGER;
                const rankB = methodRanks[b.method] || Number.MAX_SAFE_INTEGER;
                return direction === 'asc' ? rankA - rankB : rankB - rankA;
            }

            // 👇 参数列排序优化应该加在这里 👇
            if (column === 'params') {
                // 获取参数值，空值/无效值特殊处理
                const getParamValue = (item) => {
                    // 判断是否为空值或无效值
                    if (item.params === '-' || item.params === undefined || isNaN(parseFloat(item.params))) {
                        // 升序时，空值返回Infinity（排在最后）
                        // 降序时，空值返回-Infinity（排在最后）
                        if (direction === 'desc') {
                            return -Infinity;
                        } else {
                            return Infinity;
                        }

                    }
                    return parseFloat(item.params);
                };

                const valA = getParamValue(a);
                const valB = getParamValue(b);
                return direction === 'asc' ? valA - valB : valB - valA;
            }


            // 处理数值列（参数量、PSNR、SSIM等）
            if (['reds4_psnr', 'reds4_ssim', 'vimeo_psnr',
                'vimeo_ssim', 'vid4_psnr', 'vid4_ssim', 'frames'].includes(column)) {
                const getValue = (item) => {
                    if (item[column] === '-' || item[column] === undefined) return -Infinity;
                    return parseFloat(item[column]) || -Infinity;
                };

                const valA = getValue(a);
                const valB = getValue(b);
                return direction === 'asc' ? valA - valB : valB - valA;
            }

            if (header.dataset.sort === 'rank') {
                header.innerHTML = '整体性能 <i class="fas fa-sort"></i>';
            }

            return 0;
        });

        renderTable(sortedData);
    });
});


// 页面加载完成后加载数据
window.addEventListener('load', loadData);
