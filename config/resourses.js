

module.exports.getResources = () => {
    const courses = [
        {
            name: "Ứng dụng phầm mềm",
            majors: [
                { name: "Java" },
                { name: ".Net" },
            ],
            fee: 5600000
        },
        {
            name: "Phát triển phần mềm",
            majors: [
                { name: "Java" },
                { name: ".Net" },
            ],
            fee: 5600000
        },
        {
            name: "Lập trình máy tính",
            majors: [
                { name: "Mobile" },
                { name: "IOT" },
            ],
            fee: 5600000
        },
        {
            name: "Lập trình Mobile",
            majors: [
                { name: "Đa nền tảng" },
                { name: "Game" },
            ],
            fee: 5600000
        },
        {
            name: "Thiết kế trang Web",
            majors: [
                { name: "Frontend" },
                { name: "Backend" },
            ],
            fee: 5600000
        },
        {
            name: "Lập trình web",
            majors: [
                { name: "Frontend" },
                { name: "Backend" },
            ],
            fee: 5600000
        },
        {
            name: "Marketing và bán hàng",
            majors: [
                { name: "Marketing và bán hàng" }
            ],
            fee: 5600000
        },
        {
            name: "Thương mại điện tử",
            majors: [
                { name: "Thương mại điện tử", }
            ],
            fee: 5600000
        },
        {
            name: "Quan hệ công chúng và tổ chức sự kiện",
            majors: [
                { name: "Quan hệ công chúng và tổ chức sự kiện", }
            ],
            fee: 5600000
        },
        {
            name: "Logistics",
            majors: [
                { name: "Logistics", }
            ],
            fee: 5600000
        },
        {
            name: "Quản trị nhà hàng",
            majors: [
                { name: "Quản trị nhà hàng", }
            ],
            fee: 8200000
        },
        {
            name: "Quản trị khách sạn",
            majors: [
                { name: "Quản trị khách sạn", }
            ],
            fee: 8200000
        },
        {
            name: "Công nghệ kỹ thuật điều khiển và Tự động hóa",
            majors: [
                { name: "Công nghiệp" },
                { name: "Dân dụng" },
            ],
            fee: 5600000
        },
        {
            name: "Thiết kế đồ họa",
            majors: [
                { name: "Nội và ngoại thất" },
                { name: "Dựng phim và quảng cáo" },
            ],
            fee: 5600000
        },
        {
            name: "Hướng dẫn du lịch",
            majors: [
                { name: "Hướng dẫn du lịch", }
            ],
            fee: 8200000
        },
        {
            name: "Công nghệ kỹ thuật cơ khí",
            majors: [
                { name: "Công nghệ kỹ thuật cơ khí", }
            ],
            fee: 5600000
        }
    ]

    const subjects = [
        {
            code: "SKI101",
            fee: "1317000"
        },
        {
            code: "MUL101",
            fee: "1317000"
        },
        {
            code: "COM101",
            fee: "1317000"
        },
        {
            code: "COM107",
            fee: "1317000"
        },
        {
            code: "COM108",
            fee: "1317000"
        },
        {
            code: "ENT112",
            fee: "2600000"
        },
        {
            code: "WEB101",
            fee: "1317000"
        },
        {
            code: "MOB101",
            fee: "1317000"
        },
        {
            code: "COM201",
            fee: "1317000"
        },
        {
            code: "WEB104",
            fee: "1317000"
        },
        {
            code: "ENT122",
            fee: "2600000"
        },
        {
            code: "MOB102",
            fee: "1317000"
        },
        {
            code: "MOB103",
            fee: "1317000"
        },
        {
            code: "WEB302",
            fee: "1317000"
        },
        {
            code: "MOB202",
            fee: "1317000"
        },
        {
            code: "ENT212",
            fee: "2600000"
        },
        {
            code: "MOB204",
            fee: "1317000"
        },
        {
            code: "MOB201",
            fee: "1317000"
        },
        {
            code: "PRO112",
            fee: "1317000"
        },
        {
            code: "ENT222",
            fee: "2600000"
        },
        {
            code: "MOB305",
            fee: "1317000"
        },
        {
            code: "IOT101",
            fee: "1317000"
        },
        {
            code: "MOB306",
            fee: "1317000"
        },
        {
            code: "MOB401",
            fee: "1317000"
        },
        {
            code: "IOT102",
            fee: "1317000"
        },
        {
            code: "MOB402",
            fee: "1317000"
        },
        {
            code: "MOB104",
            fee: "1317000"
        },
        {
            code: "IOT201",
            fee: "1317000"
        },
        {
            code: "SKI201",
            fee: "1317000"
        },
        {
            code: "MOB403",
            fee: "1317000"
        },
        {
            code: "IOT202",
            fee: "1317000"
        },
        {
            code: "PRO205",
            fee: "2195000"
        },
        {
            code: "PRO222",
            fee: "2195000"
        },
        {
            code: "PRO118",
            fee: "2195000"
        },
        {
            code: "VIE103",
            fee: "880000"
        },
        {
            code: "VIE101",
            fee: "880000"
        },
        {
            code: "VIE102",
            fee: "878000"
        },
        {
            code: "SYB301",
            fee: "1317000"
        },
        {
            code: "MUL116",
            fee: "1317000"
        },
        {
            code: "MUL102",
            fee: "1317000"
        },
        {
            code: "MUL214",
            fee: "1317000"
        },
        {
            code: "MUL114",
            fee: "1317000"
        },
        {
            code: "MUL117",
            fee: "1317000"
        },
        {
            code: "MUL211",
            fee: "1317000"
        },
        {
            code: "MUL212",
            fee: "1317000"
        },
        {
            code: "MUL213",
            fee: "1317000"
        },
        {
            code: "MUL217",
            fee: "1317000"
        },
        {
            code: "MUL319",
            fee: "1317000"
        },
        {
            code: "MUL215",
            fee: "1317000"
        },
        {
            code: "MUL216",
            fee: "1317000"
        },
        {
            code: "PRO111",
            fee: "1317000"
        },
        {
            code: "MUL218",
            fee: "1317000"
        },
        {
            code: "MUL219",
            fee: "1317000"
        },
        {
            code: "MUL317",
            fee: "1317000"
        },
        {
            code: "MUL220",
            fee: "1317000"
        },
        {
            code: "MUL322",
            fee: "1317000"
        },
        {
            code: "MUL321",
            fee: "1317000"
        },
        {
            code: "MUL221",
            fee: "1317000"
        },
        {
            code: "MUL222",
            fee: "1317000"
        },
        {
            code: "MUL315",
            fee: "1317000"
        },
        {
            code: "MUL311",
            fee: "1317000"
        },
        {
            code: "MUL320",
            fee: "1317000"
        },
        {
            code: "MUL318",
            fee: "1317000"
        },
        {
            code: "PRO223",
            fee: "2195000"
        },
        {
            code: "PRO221",
            fee: "2195000"
        },
        {
            code: "PRO119",
            fee: "2195000"
        },
        {
            code: "NET101",
            fee: "1317000"
        },
        {
            code: "WEB202",
            fee: "1317000"
        },
        {
            code: "WEB201",
            fee: "1317000"
        },
        {
            code: "WEB205",
            fee: "1317000"
        },
        {
            code: "WEB204",
            fee: "1317000"
        },
        {
            code: "WEB102",
            fee: "1317000"
        },
        {
            code: "PRO101",
            fee: "1317000"
        },
        {
            code: "WEB206",
            fee: "1317000"
        },
        {
            code: "WEB301",
            fee: "1317000"
        },
        {
            code: "WEB501",
            fee: "1317000"
        },
        {
            code: "WEB207",
            fee: "1317000"
        },
        {
            code: "WEB503",
            fee: "1317000"
        },
        {
            code: "SOF303",
            fee: "1317000"
        },
        {
            code: "WEB502",
            fee: "1317000"
        },
        {
            code: "WEB203",
            fee: "1317000"
        },
        {
            code: "WEB208",
            fee: "1317000"
        },
        {
            code: "WEB401",
            fee: "1317000"
        },
        {
            code: "WEB209",
            fee: "1317000"
        },
        {
            code: "PRO224",
            fee: "2195000"
        },
        {
            code: "PRO220",
            fee: "2195000"
        },
        {
            code: "PRO116",
            fee: "2195000"
        },
        {
            code: "COM203",
            fee: "1317000"
        },
        {
            code: "NET102",
            fee: "1317000"
        },
        {
            code: "SOF203",
            fee: "1317000"
        },
        {
            code: "NET103",
            fee: "1317000"
        },
        {
            code: "SOF204",
            fee: "1317000"
        },
        {
            code: "SOF205",
            fee: "1317000"
        },
        {
            code: "SOF102",
            fee: "1317000"
        },
        {
            code: "PRO104",
            fee: "1317000"
        },
        {
            code: "PRO131",
            fee: "1317000"
        },
        {
            code: "SOF304",
            fee: "1317000"
        },
        {
            code: "SOF307",
            fee: "1317000"
        },
        {
            code: "SOF301",
            fee: "1317000"
        },
        {
            code: "NET104",
            fee: "1317000"
        },
        {
            code: "SOF302",
            fee: "1317000"
        },
        {
            code: "NET105",
            fee: "1317000"
        },
        {
            code: "SOF306",
            fee: "1317000"
        },
        {
            code: "NET106",
            fee: "1317000"
        },
        {
            code: "PRO211",
            fee: "2195000"
        },
        {
            code: "PRO219",
            fee: "2195000"
        },
        {
            code: "PRO115",
            fee: "2195000"
        },
        {
            code: "MAR102",
            fee: "1317000"
        },
        {
            code: "PRE101",
            fee: "1317000"
        },
        {
            code: "PRE102",
            fee: "1317000"
        },
        {
            code: "PRE103",
            fee: "1317000"
        },
        {
            code: "PRE105",
            fee: "1317000"
        },
        {
            code: "PRE104",
            fee: "1317000"
        },
        {
            code: "PRE106",
            fee: "1317000"
        },
        {
            code: "PRE203",
            fee: "1317000"
        },
        {
            code: "PRE210",
            fee: "1317000"
        },
        {
            code: "PRE202",
            fee: "1317000"
        },
        {
            code: "PRE206",
            fee: "1317000"
        },
        {
            code: "PRE204",
            fee: "1317000"
        },
        {
            code: "PRO114",
            fee: "1317000"
        },
        {
            code: "PRE205",
            fee: "1317000"
        },
        {
            code: "PRE207",
            fee: "1317000"
        },
        {
            code: "MAR207",
            fee: "1317000"
        },
        {
            code: "PRE208",
            fee: "1317000"
        },
        {
            code: "PRE209",
            fee: "1317000"
        },
        {
            code: "PRO213",
            fee: "2195000"
        },
        {
            code: "PRO110",
            fee: "2195000"
        },
        {
            code: "MAR103",
            fee: "1317000"
        },
        {
            code: "BUS102",
            fee: "1317000"
        },
        {
            code: "BUS201",
            fee: "1317000"
        },
        {
            code: "MAR202",
            fee: "1317000"
        },
        {
            code: "DOM106",
            fee: "1317000"
        },
        {
            code: "PRE201",
            fee: "1317000"
        },
        {
            code: "BUS204",
            fee: "1317000"
        },
        {
            code: "MAR205",
            fee: "1317000"
        },
        {
            code: "BUS303",
            fee: "1317000"
        },
        {
            code: "PRO102",
            fee: "1317000"
        },
        {
            code: "DOM105",
            fee: "1317000"
        },
        {
            code: "MAR206",
            fee: "1317000"
        },
        {
            code: "BUS205",
            fee: "1317000"
        },
        {
            code: "DOM102",
            fee: "1317000"
        },
        {
            code: "BUS103",
            fee: "1317000"
        },
        {
            code: "PRO204",
            fee: "2195000"
        },
        {
            code: "PRO117",
            fee: "2195000"
        },
        {
            code: "DOM101",
            fee: "1317000"
        },
        {
            code: "DOM103",
            fee: "1317000"
        },
        {
            code: "DOM104",
            fee: "1317000"
        },
        {
            code: "DOM107",
            fee: "1317000"
        },
        {
            code: "DOM108",
            fee: "1317000"
        },
        {
            code: "PRO113",
            fee: "1317000"
        },
        {
            code: "DOM201",
            fee: "1317000"
        },
        {
            code: "DOM202",
            fee: "1317000"
        },
        {
            code: "DOM203",
            fee: "1317000"
        },
        {
            code: "PRO212",
            fee: "2195000"
        },
        {
            code: "PRO109",
            fee: "2195000"
        },
        {
            code: "TOU101",
            fee: "1317000"
        },
        {
            code: "HIS101",
            fee: "1317000"
        },
        {
            code: "TOU102",
            fee: "1317000"
        },
        {
            code: "TOU106",
            fee: "1317000"
        },
        {
            code: "PSY101",
            fee: "1317000"
        },
        {
            code: "HIS102",
            fee: "1317000"
        },
        {
            code: "TOU107",
            fee: "1317000"
        },
        {
            code: "TOU103",
            fee: "1317000"
        },
        {
            code: "TOU201",
            fee: "1317000"
        },
        {
            code: "ETO101",
            fee: "1317000"
        },
        {
            code: "TOU202",
            fee: "1317000"
        },
        {
            code: "TOU203",
            fee: "1317000"
        },
        {
            code: "TOU204",
            fee: "1317000"
        },
        {
            code: "ETO201",
            fee: "1317000"
        },
        {
            code: "PRO105",
            fee: "1756000"
        },
        {
            code: "TOU301",
            fee: "1317000"
        },
        {
            code: "TOU302",
            fee: "1317000"
        },
        {
            code: "TOU401",
            fee: "1317000"
        },
        {
            code: "TOU402",
            fee: "1317000"
        },
        {
            code: "PRO207",
            fee: "2195000"
        },
        {
            code: "PRO120",
            fee: "2195000"
        },
        {
            code: "HOS101",
            fee: "1317000"
        },
        {
            code: "HOS401",
            fee: "1317000"
        },
        {
            code: "HOS103",
            fee: "1317000"
        },
        {
            code: "HOS102",
            fee: "1317000"
        },
        {
            code: "HOS104",
            fee: "1317000"
        },
        {
            code: "HOS105",
            fee: "1317000"
        },
        {
            code: "EHO102",
            fee: "1317000"
        },
        {
            code: "ACC105",
            fee: "1317000"
        },
        {
            code: "HOS201",
            fee: "1317000"
        },
        {
            code: "HOS202",
            fee: "1317000"
        },
        {
            code: "EHO202",
            fee: "1317000"
        },
        {
            code: "PRO108",
            fee: "1756000"
        },
        {
            code: "HOS304",
            fee: "1317000"
        },
        {
            code: "HOS305",
            fee: "1317000"
        },
        {
            code: "HOS403",
            fee: "1317000"
        },
        {
            code: "COM106",
            fee: "1317000"
        },
        {
            code: "HOS402",
            fee: "1317000"
        },
        {
            code: "PRO209",
            fee: "2195000"
        },
        {
            code: "PRO121",
            fee: "2195000"
        },
        {
            code: "HOS302",
            fee: "1317000"
        },
        {
            code: "HOS203",
            fee: "1317000"
        },
        {
            code: "HOS204",
            fee: "1317000"
        },
        {
            code: "PRO107",
            fee: "1756000"
        },
        {
            code: "HOS301",
            fee: "1317000"
        },
        {
            code: "HOS303",
            fee: "1317000"
        },
        {
            code: "PRO210",
            fee: "2195000"
        },
        {
            code: "PRO122",
            fee: "2195000"
        }
    ]

    const semesterProps = {
        sems: [
            { name: "Kỳ 1", value: "Kỳ 1", isSelected: false },
            { name: "Kỳ 2", value: "Kỳ 2", isSelected: false },
            { name: "Kỳ 3", value: "Kỳ 3", isSelected: false },
            { name: "Kỳ 4", value: "Kỳ 4", isSelected: false },
            { name: "Kỳ 5", value: "Kỳ 5", isSelected: false },
            { name: "Kỳ 6", value: "Kỳ 6", isSelected: false },
            { name: "Kỳ 7", value: "Kỳ 7", isSelected: false },
        ],
        status: [
            { name: "Học chờ TN2", value: "Học chờ TN2", isSelected: false },
            { name: "Học chờ TN21", value: "Học chờ TN2", isSelected: false },
            { name: "Học đi HDI", value: "Học đi HDI", isSelected: false },
        ]
    }

    const englishProps = {
        levels: [
            { name: "Chọn", value: "Chọn", isSelected: false },
            { name: "TA 1.1 - ENT1126", value: "TA 1.1 - ENT1126", isSelected: false },            
            { name: "TA 1.2 - ENT1225", value: "TA 1.2 - ENT1225", isSelected: false },
            { name: "TA 2.1 - ENT2125", value: "TA 2.1 - ENT2125", isSelected: false },
            { name: "TA 2.2 - ENT2225", value: "TA 2.2 - ENT2225", isSelected: false },
        ],
        status: [
            { name: "HD", value: "HD", isSelected: false },
            { name: "HL", value: "HL", isSelected: false },
            { name: "Dự thu", value: "Dự thu", isSelected: false },
        ],
        fees: [
            { name: "2600000", value: "2600000", isSelected: false },
            { name: "1300000", value: "1300000", isSelected: false },
        ]
    }

    return { courses, subjects, semesterProps, englishProps }
}