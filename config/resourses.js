

module.exports.getResources = () => {
    // chú ý thứ tự này không dc thay đổi, đang đọc ngoài client
    const courses = [
        {
            name: "Ứng dụng phần mềm",
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
        },
        {
            name: "Xử lý dữ liệu",
            majors: [
                { name: "Xử lý dữ liệu", }
            ],
            fee: 5600000
        },
    ]

    const subjects = [
        {
            code: "SKI101",
            fee: "1344000 "
        },
        {
            code: "MUL101",
            fee: "1344000 "
        },
        {
            code: "COM101",
            fee: "1344000 "
        },
        {
            code: "COM107",
            fee: "1344000 "
        },
        {
            code: "COM108",
            fee: "1344000 "
        },
        {
            code: "ENT112",
            fee: "2600000 "
        },
        {
            code: "WEB101",
            fee: "1344000 "
        },
        {
            code: "MOB101",
            fee: "1344000 "
        },
        {
            code: "COM201",
            fee: "1344000 "
        },
        {
            code: "WEB104",
            fee: "1344000 "
        },
        {
            code: "ENT122",
            fee: "2600000 "
        },
        {
            code: "MOB102",
            fee: "1344000 "
        },
        {
            code: "MOB103",
            fee: "1344000 "
        },
        {
            code: "WEB302",
            fee: "1344000 "
        },
        {
            code: "MOB202",
            fee: "1344000 "
        },
        {
            code: "ENT212",
            fee: "2600000 "
        },
        {
            code: "MOB204",
            fee: "1344000 "
        },
        {
            code: "MOB201",
            fee: "1344000 "
        },
        {
            code: "PRO112",
            fee: "1344000 "
        },
        {
            code: "ENT222",
            fee: "2600000 "
        },
        {
            code: "MOB305",
            fee: "1344000 "
        },
        {
            code: "IOT101",
            fee: "1344000 "
        },
        {
            code: "MOB306",
            fee: "1344000 "
        },
        {
            code: "MOB401",
            fee: "1344000 "
        },
        {
            code: "IOT102",
            fee: "1344000 "
        },
        {
            code: "MOB402",
            fee: "1344000 "
        },
        {
            code: "MOB104",
            fee: "1344000 "
        },
        {
            code: "IOT201",
            fee: "1344000 "
        },
        {
            code: "SKI201",
            fee: "1344000 "
        },
        {
            code: "MOB403",
            fee: "1344000 "
        },
        {
            code: "IOT202",
            fee: "1344000 "
        },
        {
            code: "PRO205",
            fee: "2240000 "
        },
        {
            code: "PRO222",
            fee: "2240000 "
        },
        {
            code: "PRO118",
            fee: "2240000 "
        },
        {
            code: "VIE103",
            fee: "896000 "
        },
        {
            code: "VIE101",
            fee: "1792000 "
        },
        {
            code: "VIE102",
            fee: "896000 "
        },
        {
            code: "SYB301",
            fee: "1344000 "
        },
        {
            code: "MUL116",
            fee: "1344000 "
        },
        {
            code: "MUL102",
            fee: "1344000 "
        },
        {
            code: "MUL214",
            fee: "1344000 "
        },
        {
            code: "MUL114",
            fee: "1344000 "
        },
        {
            code: "MUL117",
            fee: "1344000 "
        },
        {
            code: "MUL211",
            fee: "1344000 "
        },
        {
            code: "MUL212",
            fee: "1344000 "
        },
        {
            code: "MUL213",
            fee: "1344000 "
        },
        {
            code: "MUL217",
            fee: "1344000 "
        },
        {
            code: "MUL319",
            fee: "1344000 "
        },
        {
            code: "MUL215",
            fee: "1344000 "
        },
        {
            code: "MUL216",
            fee: "1344000 "
        },
        {
            code: "PRO111",
            fee: "1344000 "
        },
        {
            code: "MUL218",
            fee: "1344000 "
        },
        {
            code: "MUL219",
            fee: "1344000 "
        },
        {
            code: "MUL317",
            fee: "1344000 "
        },
        {
            code: "MUL220",
            fee: "1344000 "
        },
        {
            code: "MUL322",
            fee: "1344000 "
        },
        {
            code: "MUL321",
            fee: "1344000 "
        },
        {
            code: "MUL221",
            fee: "1344000 "
        },
        {
            code: "MUL222",
            fee: "1344000 "
        },
        {
            code: "MUL315",
            fee: "1344000 "
        },
        {
            code: "MUL311",
            fee: "1344000 "
        },
        {
            code: "MUL320",
            fee: "1344000 "
        },
        {
            code: "MUL318",
            fee: "1344000 "
        },
        {
            code: "PRO223",
            fee: "2240000 "
        },
        {
            code: "PRO221",
            fee: "2240000 "
        },
        {
            code: "PRO119",
            fee: "2240000 "
        },
        {
            code: "NET101",
            fee: "1344000 "
        },
        {
            code: "WEB202",
            fee: "1344000 "
        },
        {
            code: "WEB201",
            fee: "1344000 "
        },
        {
            code: "WEB205",
            fee: "1344000 "
        },
        {
            code: "WEB204",
            fee: "1344000 "
        },
        {
            code: "WEB102",
            fee: "1344000 "
        },
        {
            code: "PRO101",
            fee: "1344000 "
        },
        {
            code: "WEB206",
            fee: "1344000 "
        },
        {
            code: "WEB301",
            fee: "1344000 "
        },
        {
            code: "WEB501",
            fee: "1344000 "
        },
        {
            code: "WEB207",
            fee: "1344000 "
        },
        {
            code: "WEB503",
            fee: "1344000 "
        },
        {
            code: "SOF303",
            fee: "1344000 "
        },
        {
            code: "WEB502",
            fee: "1344000 "
        },
        {
            code: "WEB203",
            fee: "1344000 "
        },
        {
            code: "WEB208",
            fee: "1344000 "
        },
        {
            code: "WEB401",
            fee: "1344000 "
        },
        {
            code: "WEB209",
            fee: "1344000 "
        },
        {
            code: "PRO224",
            fee: "2240000 "
        },
        {
            code: "PRO220",
            fee: "2240000 "
        },
        {
            code: "PRO116",
            fee: "2240000 "
        },
        {
            code: "COM203",
            fee: "1344000 "
        },
        {
            code: "NET102",
            fee: "1344000 "
        },
        {
            code: "SOF203",
            fee: "1344000 "
        },
        {
            code: "NET103",
            fee: "1344000 "
        },
        {
            code: "SOF204",
            fee: "1344000 "
        },
        {
            code: "SOF205",
            fee: "1344000 "
        },
        {
            code: "SOF102",
            fee: "1344000 "
        },
        {
            code: "PRO104",
            fee: "1344000 "
        },
        {
            code: "PRO131",
            fee: "1344000 "
        },
        {
            code: "SOF304",
            fee: "1344000 "
        },
        {
            code: "SOF307",
            fee: "1344000 "
        },
        {
            code: "SOF301",
            fee: "1344000 "
        },
        {
            code: "NET104",
            fee: "1344000 "
        },
        {
            code: "SOF302",
            fee: "1344000 "
        },
        {
            code: "NET105",
            fee: "1344000 "
        },
        {
            code: "SOF306",
            fee: "1344000 "
        },
        {
            code: "NET106",
            fee: "1344000 "
        },
        {
            code: "PRO211",
            fee: "2240000 "
        },
        {
            code: "PRO219",
            fee: "2240000 "
        },
        {
            code: "PRO115",
            fee: "2240000 "
        },
        {
            code: "MAR102",
            fee: "1344000 "
        },
        {
            code: "PRE101",
            fee: "1344000 "
        },
        {
            code: "PRE102",
            fee: "1344000 "
        },
        {
            code: "PRE103",
            fee: "1344000 "
        },
        {
            code: "PRE105",
            fee: "1344000 "
        },
        {
            code: "PRE104",
            fee: "1344000 "
        },
        {
            code: "PRE106",
            fee: "1344000 "
        },
        {
            code: "PRE203",
            fee: "1344000 "
        },
        {
            code: "PRE210",
            fee: "1344000 "
        },
        {
            code: "PRE202",
            fee: "1344000 "
        },
        {
            code: "PRE206",
            fee: "1344000 "
        },
        {
            code: "PRE204",
            fee: "1344000 "
        },
        {
            code: "PRO114",
            fee: "1344000 "
        },
        {
            code: "PRE205",
            fee: "1344000 "
        },
        {
            code: "PRE207",
            fee: "1344000 "
        },
        {
            code: "MAR207",
            fee: "1344000 "
        },
        {
            code: "PRE208",
            fee: "1344000 "
        },
        {
            code: "PRE209",
            fee: "1344000 "
        },
        {
            code: "PRO213",
            fee: "2240000 "
        },
        {
            code: "PRO110",
            fee: "2240000 "
        },
        {
            code: "MAR103",
            fee: "1344000 "
        },
        {
            code: "BUS102",
            fee: "1344000 "
        },
        {
            code: "BUS201",
            fee: "1344000 "
        },
        {
            code: "MAR202",
            fee: "1344000 "
        },
        {
            code: "DOM106",
            fee: "1344000 "
        },
        {
            code: "PRE201",
            fee: "1344000 "
        },
        {
            code: "BUS204",
            fee: "1344000 "
        },
        {
            code: "MAR205",
            fee: "1344000 "
        },
        {
            code: "BUS303",
            fee: "1344000 "
        },
        {
            code: "PRO102",
            fee: "1344000 "
        },
        {
            code: "DOM105",
            fee: "1344000 "
        },
        {
            code: "MAR206",
            fee: "1344000 "
        },
        {
            code: "BUS205",
            fee: "1344000 "
        },
        {
            code: "DOM102",
            fee: "1344000 "
        },
        {
            code: "BUS103",
            fee: "1344000 "
        },
        {
            code: "PRO204",
            fee: "2240000 "
        },
        {
            code: "PRO117",
            fee: "2240000 "
        },
        {
            code: "DOM101",
            fee: "1344000 "
        },
        {
            code: "DOM103",
            fee: "1344000 "
        },
        {
            code: "DOM104",
            fee: "1344000 "
        },
        {
            code: "DOM107",
            fee: "1344000 "
        },
        {
            code: "DOM108",
            fee: "1344000 "
        },
        {
            code: "PRO113",
            fee: "1344000 "
        },
        {
            code: "DOM201",
            fee: "1344000 "
        },
        {
            code: "DOM202",
            fee: "1344000 "
        },
        {
            code: "DOM203",
            fee: "1344000 "
        },
        {
            code: "PRO212",
            fee: "2240000 "
        },
        {
            code: "PRO109",
            fee: "2240000 "
        },
        {
            code: "TOU101",
            fee: "1344000 "
        },
        {
            code: "HIS101",
            fee: "1344000 "
        },
        {
            code: "TOU102",
            fee: "1344000 "
        },
        {
            code: "TOU106",
            fee: "1344000 "
        },
        {
            code: "PSY101",
            fee: "1344000 "
        },
        {
            code: "HIS102",
            fee: "1344000 "
        },
        {
            code: "TOU107",
            fee: "1344000 "
        },
        {
            code: "TOU103",
            fee: "1344000 "
        },
        {
            code: "TOU201",
            fee: "1344000 "
        },
        {
            code: "ETO101",
            fee: "1344000 "
        },
        {
            code: "TOU202",
            fee: "1344000 "
        },
        {
            code: "TOU203",
            fee: "1344000 "
        },
        {
            code: "TOU204",
            fee: "1344000 "
        },
        {
            code: "ETO201",
            fee: "1344000 "
        },
        {
            code: "PRO105",
            fee: "1792000 "
        },
        {
            code: "TOU301",
            fee: "1344000 "
        },
        {
            code: "TOU302",
            fee: "1344000 "
        },
        {
            code: "TOU401",
            fee: "1344000 "
        },
        {
            code: "TOU402",
            fee: "1344000 "
        },
        {
            code: "PRO207",
            fee: "2240000 "
        },
        {
            code: "PRO120",
            fee: "2240000 "
        },
        {
            code: "HOS101",
            fee: "1344000 "
        },
        {
            code: "HOS401",
            fee: "1344000 "
        },
        {
            code: "HOS103",
            fee: "1344000 "
        },
        {
            code: "HOS102",
            fee: "1344000 "
        },
        {
            code: "HOS104",
            fee: "1344000 "
        },
        {
            code: "HOS105",
            fee: "1344000 "
        },
        {
            code: "EHO102",
            fee: "1344000 "
        },
        {
            code: "ACC105",
            fee: "1344000 "
        },
        {
            code: "HOS201",
            fee: "1344000 "
        },
        {
            code: "HOS202",
            fee: "1344000 "
        },
        {
            code: "EHO202",
            fee: "1344000 "
        },
        {
            code: "PRO108",
            fee: "1792000 "
        },
        {
            code: "HOS304",
            fee: "1344000 "
        },
        {
            code: "HOS305",
            fee: "1344000 "
        },
        {
            code: "HOS403",
            fee: "1344000 "
        },
        {
            code: "COM106",
            fee: "1344000 "
        },
        {
            code: "HOS402",
            fee: "1344000 "
        },
        {
            code: "PRO209",
            fee: "2240000 "
        },
        {
            code: "PRO121",
            fee: "2240000 "
        },
        {
            code: "HOS302",
            fee: "1344000 "
        },
        {
            code: "HOS203",
            fee: "1344000 "
        },
        {
            code: "HOS204",
            fee: "1344000 "
        },
        {
            code: "PRO107",
            fee: "1792000 "
        },
        {
            code: "HOS301",
            fee: "1344000 "
        },
        {
            code: "HOS303",
            fee: "1344000 "
        },
        {
            code: "PRO210",
            fee: "2240000 "
        },
        {
            code: "PRO122",
            fee: "2240000 "
        },
        {
            code: "LOG101",
            fee: "1344000 "
        },
        {
            code: "HOS106",
            fee: "1344000 "
        },
        {
            code: "HOS106",
            fee: "1344000 "
        },
        {
            code: "INE101",
            fee: "1344000 "
        },
        {
            code: "INE102",
            fee: "896000 "
        },
        {
            code: "INE106",
            fee: "896000 "
        },
        {
            code: "INE113",
            fee: "1344000 "
        },
        {
            code: "INE104",
            fee: "896000 "
        },
        {
            code: "INE110",
            fee: "1344000 "
        },
        {
            code: "INE114",
            fee: "1344000 "
        },
        {
            code: "INE202",
            fee: "1344000 "
        },
        {
            code: "INE115",
            fee: "1344000 "
        },
        {
            code: "INE222",
            fee: "896000 "
        },
        {
            code: "INE214",
            fee: "1344000 "
        },
        {
            code: "INE203",
            fee: "1344000 "
        },
        {
            code: "PRO127",
            fee: "1344000 "
        },
        {
            code: "INE215",
            fee: "896000 "
        },
        {
            code: "INE212",
            fee: "1344000 "
        },
        {
            code: "INE109",
            fee: "1344000 "
        },
        {
            code: "INE205",
            fee: "896000 "
        },
        {
            code: "INE220",
            fee: "1344000 "
        },
        {
            code: "INE224",
            fee: "1792000 "
        },
        {
            code: "INE221",
            fee: "896000 "
        },
        {
            code: "PRO128",
            fee: "2240000 "
        },
        {
            code: "PRO216",
            fee: "2240000 "
        },
        {
            code: "INE101",
            fee: "1344000 "
        },
        {
            code: "INE102",
            fee: "896000 "
        },
        {
            code: "INE106",
            fee: "896000 "
        },
        {
            code: "INE113",
            fee: "1344000 "
        },
        {
            code: "INE104",
            fee: "896000 "
        },
        {
            code: "INE110",
            fee: "1344000 "
        },
        {
            code: "INE114",
            fee: "1344000 "
        },
        {
            code: "INE202",
            fee: "1344000 "
        },
        {
            code: "INE115",
            fee: "1344000 "
        },
        {
            code: "AUT111",
            fee: "1344000 "
        },
        {
            code: "INE214",
            fee: "1344000 "
        },
        {
            code: "INE203",
            fee: "1344000 "
        },
        {
            code: "PRO132",
            fee: "1344000 "
        },
        {
            code: "INE215",
            fee: "896000 "
        },
        {
            code: "INE216",
            fee: "896000 "
        },
        {
            code: "INE109",
            fee: "1344000 "
        },
        {
            code: "INE205",
            fee: "896000 "
        },
        {
            code: "INE217",
            fee: "1344000 "
        },
        {
            code: "INE223",
            fee: "1344000 "
        },
        {
            code: "INE218",
            fee: "1344000 "
        },
        {
            code: "PRO123",
            fee: "2240000 "
        },
        {
            code: "PRO214",
            fee: "2240000 "
        },
        {
            code: "AUT103",
            fee: "1344000 "
        },
        {
            code: "AUT102",
            fee: "1344000 "
        },
        {
            code: "AUT104",
            fee: "1344000 "
        },
        {
            code: "AUT105",
            fee: "1344000 "
        },
        {
            code: "AUT106",
            fee: "1344000 "
        },
        {
            code: "AUT107",
            fee: "1344000 "
        },
        {
            code: "AUT108",
            fee: "1344000 "
        },
        {
            code: "INE202",
            fee: "1344000 "
        },
        {
            code: "AUT109",
            fee: "1344000 "
        },
        {
            code: "AUT110",
            fee: "1344000 "
        },
        {
            code: "INE214",
            fee: "1344000 "
        },
        {
            code: "AUT206",
            fee: "1344000 "
        },
        {
            code: "PRO125",
            fee: "1344000 "
        },
        {
            code: "AUT207",
            fee: "1344000 "
        },
        {
            code: "AUT208",
            fee: "1344000 "
        },
        {
            code: "AUT209",
            fee: "1344000 "
        },
        {
            code: "AUT210",
            fee: "1344000 "
        },
        {
            code: "AUT211",
            fee: "1344000 "
        },
        {
            code: "AUT212",
            fee: "1344000 "
        },
        {
            code: "AUT213",
            fee: "1344000 "
        },
        {
            code: "AUT214",
            fee: "1344000 "
        },
        {
            code: "AUT215",
            fee: "1344000 "
        },
        {
            code: "AUT216",
            fee: "1344000 "
        },
        {
            code: "AUT217",
            fee: "1344000 "
        },
        {
            code: "PRO126",
            fee: "2240000 "
        },
        {
            code: "PRO215",
            fee: "2240000 "
        },
        {
            code: "MEC105",
            fee: "896000 "
        },
        {
            code: "MEC114",
            fee: "1344000 "
        },
        {
            code: "MEC120",
            fee: "896000 "
        },
        {
            code: "MEC121",
            fee: "896000 "
        },
        {
            code: "MEC122",
            fee: "1344000 "
        },
        {
            code: "MEC123",
            fee: "1344000 "
        },
        {
            code: "MEC124",
            fee: "896000 "
        },
        {
            code: "MEC125",
            fee: "1344000 "
        },
        {
            code: "MEC213",
            fee: "1344000 "
        },
        {
            code: "MEC214",
            fee: "896000 "
        },
        {
            code: "MEC215",
            fee: "1344000 "
        },
        {
            code: "MEC220",
            fee: "1792000 "
        },
        {
            code: "PRO129",
            fee: "896000 "
        },
        {
            code: "MEC202",
            fee: "896000 "
        },
        {
            code: "MEC221",
            fee: "1344000 "
        },
        {
            code: "MEC222",
            fee: "1792000 "
        },
        {
            code: "MEC223",
            fee: "1792000 "
        },
        {
            code: "MEC224",
            fee: "1344000 "
        },
        {
            code: "MEC225",
            fee: "1792000 "
        },
        {
            code: "MEC226",
            fee: "1792000 "
        },
        {
            code: "PRO130",
            fee: "2240000 "
        },
        {
            code: "PRO218",
            fee: "2240000 "
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
            { name: "Chọn", value: "", isSelected: false },
            { name: "Học chờ TN2", value: "Học chờ TN2", isSelected: false },
            { name: "Học chờ TN21", value: "Học chờ TN21", isSelected: false },
            { name: "Học đi HDI", value: "Học đi HDI", isSelected: false },
        ]
    }

    const englishProps = {
        levels: [
            { name: "Chọn", value: "", isSelected: false },
            { name: "ENT112", value: "ENT112", isSelected: false },
            { name: "ENT122", value: "ENT122", isSelected: false },
            { name: "ENT212", value: "ENT212", isSelected: false },
            { name: "ENT222", value: "ENT222", isSelected: false },
            { name: "ETO101", value: "ETO101", isSelected: false },
            { name: "ETO102", value: "ETO102", isSelected: false },
            { name: "EHO101", value: "EHO101", isSelected: false },
            { name: "EHO102", value: "EHO102", isSelected: false },
        ],
        status: [
            { name: "HD", value: "HD", isSelected: false },
            { name: "HL", value: "HL", isSelected: false },
        ],
        fees: [
            { name: "2600000", value: "2600000", isSelected: false },
            { name: "1300000", value: "1300000", isSelected: false },
            { name: "0", value: "0", isSelected: false },
        ]
    }

    const newCourses = [
        {
            "name": "Thương mại điện tử QĐ 661/2019",
            "displayName": "Thương mại điện tử",
            "fee": "0",
            "value": "1"
        },
        {
            "name": "Quản trị doanh nghiệp vừa và nhỏ QĐ 661/2019",
            "displayName": "Quản trị doanh nghiệp vừa và nhỏ",
            "fee": "0",
            "value": "2"
        },
        {
            "name": "Công nghệ thông tin (Ứng dụng phần mềm - Java) QĐ 661/2019",
            "displayName": "Công nghệ thông tin (Ứng dụng phần mềm - Java)",
            "fee": "0",
            "value": "3"
        },
        {
            "name": "Lập trình máy tính (Mobile) QĐ 661/2019",
            "displayName": "Lập trình máy tính (Mobile)",
            "fee": "0",
            "value": "4"
        },
        {
            "name": "Quan hệ công chúng QĐ 661/2019",
            "displayName": "Quan hệ công chúng",
            "fee": "0",
            "value": "5"
        },
        {
            "name": "Thiết kế đồ họa (Thiết kế nội và ngoại thất) QĐ 661/2019",
            "displayName": "Thiết kế đồ họa (Thiết kế nội và ngoại thất)",
            "fee": "0",
            "value": "6"
        },
        {
            "name": "Thiết kế trang web (Back-End) QĐ 661/2019",
            "displayName": "Thiết kế trang web (Back-End)",
            "fee": "0",
            "value": "7"
        },
        {
            "name": "Hướng dẫn du lịch QĐ 661/2019",
            "displayName": "Hướng dẫn du lịch",
            "fee": "0",
            "value": "8"
        },
        {
            "name": "Quản trị khách sạn QĐ 661/2019",
            "displayName": "Quản trị khách sạn",
            "fee": "0",
            "value": "9"
        },
        {
            "name": "Quản trị nhà hàng QĐ 661/2019",
            "displayName": "Quản trị nhà hàng",
            "fee": "0",
            "value": "10"
        },
        {
            "name": "Lập trình máy tính (IOT) QĐ 661/2019",
            "displayName": "Lập trình máy tính (IOT)",
            "fee": "0",
            "value": "11"
        },
        {
            "name": "Thiết kế đồ họa (Dựng phim và quảng cáo) QĐ 661/2019",
            "displayName": "Thiết kế đồ họa (Dựng phim và quảng cáo)",
            "fee": "0",
            "value": "12"
        },
        {
            "name": "Thiết kế trang web (Front-End) QĐ 661/2019",
            "displayName": "Thiết kế trang web (Front-End)",
            "fee": "0",
            "value": "13"
        },
        {
            "name": "Công nghệ thông tin (Ứng dụng phần mềm - .Net) QĐ 661/2019",
            "displayName": "Công nghệ thông tin (Ứng dụng phần mềm - .Net)",
            "fee": "0",
            "value": "14"
        },
        {
            "name": "Phát triển phần mềm(Java) - FPL-QĐ 162B.2021-PTPM-JAVA",
            "displayName": "Phát triển phần mềm(Java)",
            "fee": "0",
            "value": "15"
        },
        {
            "name": "Lập trình mobile(Lập trình Game) - FPL-QĐ 162B.2021-LTMO-GAME",
            "displayName": "Lập trình mobile(Lập trình Game)",
            "fee": "0",
            "value": "16"
        },
        {
            "name": "Lập trình mobile(đa nền tảng) - FPL-QĐ 162B.2021-LTMO-DDNT",
            "displayName": "Lập trình mobile(đa nền tảng)",
            "fee": "0",
            "value": "17"
        },
        {
            "name": "Phát triển phần mềm(.NET) - FPL-QĐ 162B.2021-PTPM-NET",
            "displayName": "Phát triển phần mềm(.NET)",
            "fee": "0",
            "value": "18"
        },
        {
            "name": "Lập trình Web(Frontend) - FPL-QĐ 162B.2021-LTWE-FE",
            "displayName": "Lập trình Web(Frontend)",
            "fee": "0",
            "value": "19"
        },
        {
            "name": "Lập trình Web(Backend) - FPL-QĐ 162B.2021-LTWE-BE",
            "displayName": "Lập trình Web(Backend)",
            "fee": "0",
            "value": "20"
        },
        {
            "name": "Marketing và bán hàng - FPL-QĐ 162B.2021-MASA",
            "displayName": "Marketing và bán hàng",
            "fee": "0",
            "value": "21"
        },
        {
            "name": "Digital Marketing - FPL-QĐ 162B.2021-DIMA",
            "displayName": "Digital Marketing",
            "fee": "0",
            "value": "22"
        },
        {
            "name": "Quan hệ công chúng và tổ chức sự kiện - FPL-QĐ 162B.2021-PREV",
            "displayName": "Quan hệ công chúng và tổ chức sự kiện",
            "fee": "0",
            "value": "23"
        },
        {
            "name": "Quản trị nhà hàng - FPL-QĐ 162B.2021-QTNH",
            "displayName": "Quản trị nhà hàng",
            "fee": "0",
            "value": "24"
        },
        {
            "name": "Quản trị khách sạn - FPL-QĐ 162B.2021-QTKS",
            "displayName": "Quản trị khách sạn",
            "fee": "0",
            "value": "25"
        },
        {
            "name": "Công nghệ kỹ thuật điện, điện tử - FPL-QĐ 162B.2021-DDTU",
            "displayName": "Công nghệ kỹ thuật điện, điện tử",
            "fee": "0",
            "value": "26"
        },
        {
            "name": "Điện công nghiệp - FPL-QĐ 162B.2021-DCNG",
            "displayName": "Điện công nghiệp",
            "fee": "0",
            "value": "27"
        },
        {
            "name": "Công nghệ kỹ thuật điều khiển và tự động hóa(công nghiệp) - FPL-QĐ 162B.2021-TDHO-DK&TDHCN",
            "displayName": "Công nghệ kỹ thuật điều khiển và tự động hóa(công nghiệp)",
            "fee": "0",
            "value": "28"
        },
        {
            "name": "Công nghệ kỹ thuật điều khiển và tự động hóa(dân dụng) - FPL-QĐ 162B.2021-TDHO-DK&TDHDD",
            "displayName": "Công nghệ kỹ thuật điều khiển và tự động hóa(dân dụng)",
            "fee": "0",
            "value": "29"
        },
        {
            "name": "Thiết kế đồ họa(Thiết kế nội và ngoại thất) - FPL-QĐ 162B.2021-TKDH-NNT",
            "displayName": "Thiết kế đồ họa(Thiết kế nội và ngoại thất)",
            "fee": "0",
            "value": "30"
        },
        {
            "name": "Thiết kế đồ họa(Dựng phim và quảng cáo) - FPL-QĐ 162B.2021-TKDH-DPQC",
            "displayName": "Thiết kế đồ họa(Dựng phim và quảng cáo)",
            "fee": "0",
            "value": "31"
        },
        {
            "name": "Hướng dẫn du lịch - FPL-QĐ 162B.2021-HDDL",
            "displayName": "Hướng dẫn du lịch",
            "fee": "0",
            "value": "32"
        },
        {
            "name": "Công nghệ kỹ thuật cơ khí - FPL-QĐ 162B.2021-KTCK",
            "displayName": "Công nghệ kỹ thuật cơ khí",
            "fee": "0",
            "value": "33"
        },
        {
            "name": "Công nghệ kỹ thuật cơ khí - FPL-QĐ 154.2022-KTCK",
            "displayName": "Công nghệ kỹ thuật cơ khí",
            "fee": "0",
            "value": "34"
        },
        {
            "name": "Lập trình mobile(đa nền tảng) - FPL-QĐ 154.2022-LTMO-DANT",
            "displayName": "Lập trình mobile(đa nền tảng)",
            "fee": "0",
            "value": "35"
        },
        {
            "name": "Lập trình mobile(Lập trình Game) - FPL-QĐ 154.2022-LTMO-GAME",
            "displayName": "Lập trình mobile(Lập trình Game)",
            "fee": "0",
            "value": "36"
        },
        {
            "name": "Lập trình Web(Backend) - FPL-QĐ 154.2022-LTWE-BE",
            "displayName": "Lập trình Web(Backend)",
            "fee": "0",
            "value": "37"
        },
        {
            "name": "Lập trình Web(Frontend) - FPL-QĐ 154.2022-LTWE-FE",
            "displayName": "Lập trình Web(Frontend)",
            "fee": "0",
            "value": "38"
        },
        {
            "name": "Phát triển phần mềm(Java) - FPL-QĐ 154.2022-PTPM-JAVA",
            "displayName": "Phát triển phần mềm(Java)",
            "fee": "0",
            "value": "39"
        },
        {
            "name": "Phát triển phần mềm(.NET) - FPL-QĐ 154.2022-PTPM-NET",
            "displayName": "Phát triển phần mềm(.NET)",
            "fee": "0",
            "value": "40"
        },
        {
            "name": "Ứng dụng phần mềm - FPL-QĐ 154.2022-UDPM",
            "displayName": "Ứng dụng phần mềm",
            "fee": "0",
            "value": "41"
        },
        {
            "name": "Xử lý dữ liệu - FPL-QĐ 154.2022-XLDL",
            "displayName": "Xử lý dữ liệu",
            "fee": "0",
            "value": "42"
        },
        {
            "name": "Hướng dẫn du lịch - FPL-QĐ 154.2022-HDDL",
            "displayName": "Hướng dẫn du lịch",
            "fee": "0",
            "value": "43"
        },
        {
            "name": "Logistics - FPL-QĐ 154.2022-LOGI",
            "displayName": "Logistics",
            "fee": "0",
            "value": "44"
        },
        {
            "name": "Quản trị khách sạn - FPL-QĐ 154.2022-QTKS",
            "displayName": "Quản trị khách sạn",
            "fee": "0",
            "value": "45"
        },
        {
            "name": "Quản trị nhà hàng - FPL-QĐ 154.2022-QTNH",
            "displayName": "Quản trị nhà hàng",
            "fee": "0",
            "value": "46"
        },
        {
            "name": "Marketing và bán hàng - FPL-QĐ 154.2022-MASA",
            "displayName": "Marketing và bán hàng",
            "fee": "0",
            "value": "47"
        },
        {
            "name": "Quan hệ công chúng và tổ chức sự kiện - FPL-QĐ 154.2022-PREV",
            "displayName": "Marketing và bán hàng",
            "fee": "0",
            "value": "48"
        },
        {
            "name": "Digital Marketing - FPL-QĐ 154.2022-DIMA",
            "displayName": "Quan hệ công chúng và tổ chức sự kiện",
            "fee": "0",
            "value": "49"
        },
        {
            "name": "Thiết kế đồ họa(Thiết kế nội và ngoại thất) - FPL-QĐ 154.2022-TKDH-NNT",
            "displayName": "Digital Marketing",
            "fee": "0",
            "value": "50"
        },
        {
            "name": "Thiết kế đồ họa(Dựng phim và quảng cáo) - FPL-QĐ 154.2022-TKDH-DPQC",
            "displayName": "Thiết kế đồ họa(Dựng phim và quảng cáo)",
            "fee": "0",
            "value": "51"
        },
        {
            "name": "Công nghệ kỹ thuật điều khiển và tự động hóa(công nghiệp) - FPL-QĐ 154.2022-TDHO-DK&TDHCN",
            "displayName": "Công nghệ kỹ thuật điều khiển và tự động hóa(công nghiệp)",
            "fee": "0",
            "value": "52"
        },
        {
            "name": "Công nghệ kỹ thuật điều khiển và tự động hóa(dân dụng) - FPL-QĐ 154.2022-TDHO-DK&TDHDD",
            "displayName": "Công nghệ kỹ thuật điều khiển và tự động hóa(dân dụng)",
            "fee": "0",
            "value": "53"
        },
        {
            "name": "Điện công nghiệp - FPL-QĐ 154.2022-DCNG",
            "displayName": "Điện công nghiệp",
            "fee": "0",
            "value": "54"
        },
        {
            "name": "Công nghệ kỹ thuật điện, điện tử - FPL-QĐ 154.2022-DDTU",
            "displayName": "Công nghệ kỹ thuật điện, điện tử",
            "fee": "0",
            "value": "55"
        }
    ]

    return { courses, subjects, semesterProps, englishProps, newCourses }
}