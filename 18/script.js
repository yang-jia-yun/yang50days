const main = document.querySelector('.main')
const image = document.querySelector('.small-img')
const list = [
	'https://img1.baidu.com/it/u=413643897,2296924942&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
	'https://img2.baidu.com/it/u=617579813,2960860841&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
	'https://lmg.jj20.com/up/allimg/1114/0406210Z024/2104060Z024-5-1200.jpg',
	'https://img1.baidu.com/it/u=3573056321,2239143646&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
	'https://lmg.jj20.com/up/allimg/1114/040221103339/210402103339-8-1200.jpg',
]
main.style.backgroundImage = `url(${list[0]})`
image.style.backgroundImage = `url(${list[0]})`
