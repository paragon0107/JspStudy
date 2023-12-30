const $startScreen = document.querySelector("#start_screen");
const $gameMenu = document.querySelector("#game_menu");
const $battleMenu = document.querySelector("#battle_menu");
const $heroName = document.querySelector("#hero_name");
const $heroLevel = document.querySelector("#hero_level");
const $heroHp = document.querySelector("#hero_hp");
const $heroXp = document.querySelector("#hero_xp");
const $heroAtt = document.querySelector("#hero_att");
const $monsterStart = document.querySelector("#monster_start");
const $monsterName = document.querySelector("#monster_name");
const $monsterHp = document.querySelector("#monster_hp");
const $monsterAtt = document.querySelector("#monster_att");
const $message = document.querySelector("#message");

const hero = {
    name: "",
    lev: 1,
    maxHp: 100,
    hp: 100,
    xp: 0,
    att: 10,
    attack(monster) {
        monster.hp -= this.att;
        this.hp -= monster.hp;
    },
    heal(monster) {
        this.hp += 20;
        this.hp -= monster.att;
    },
};
let monster = null;
const monsterList = [
    {
        name: "슬라임",
        hp: 25,
        att: 10,
        xp: 10,
        attack(monster) {
            monster.hp -= this.att;
            this.hp -= monster.hp;
        },
        heal(monster) {
            this.hp += 20;
            this.hp -= monster.att;
        },
    },
    {
        name: "스켈레톤",
        hp: 50,
        att: 15,
        xp: 20,
        attack(monster) {
            monster.hp -= this.att;
            this.hp -= monster.hp;
        },
        heal(monster) {
            this.hp += 20;
            this.hp -= monster.att;
        },
    },
    {
        name: "마왕",
        hp: 150,
        att: 35,
        xp: 50,
        attack(monster) {
            monster.hp -= this.att;
            this.hp -= monster.hp;
        },
        heal(monster) {
            this.hp += 20;
            this.hp -= monster.att;
        },
    },
];

$startScreen.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = event.target["name_input"].value;
    $startScreen.style.display = "none";
    $gameMenu.style.display = "block";
    $heroName.textContent = name;
    $heroLevel.textContent = `${hero.lev}Lev`;
    $heroHp.textContent = `HP:${hero.hp}/${hero.maxHp}`;
    $heroXp.textContent = `XP:${hero.xp}/${15 * hero.lev}`;
    $heroAtt.textContent = `ATT:${hero.att}`;
    hero.name = name;
});

$gameMenu.addEventListener("submit", (event) => {
    event.preventDefault();
    const $input = event.target["menu_input"].value;
    if ($input === "1") {
        //모험
        $gameMenu.style.display = "none";
        $battleMenu.style.display = "block";
        monster = JSON.parse(
            JSON.stringify(
                monsterList[Math.floor(Math.random() * monsterList.length)]
            )
        );
        monster.maxHp = monster.hp;
        $monsterStart.style.display = "block";
        $monsterName.textContent = monster.name;
        $monsterHp.textContent = `HP:${monster.hp}`;
        $monsterAtt.textContent = `ATT:${monster.att}`;
    } else if ($input === "2") {
        //휴식
        hero.hp = hero.maxHp;
        $heroHp.textContent = `HP:${hero.hp}/${hero.maxHp}`;
    } else if ($input === "3") {
        //종료
        location.reload();
    }
});

$battleMenu.addEventListener("submit", (event) => {
    event.preventDefault();
    const $input = event.target["battle_input"].value;
    if ($input === "1") {
        hero.attack(monster);
        monster.attack(hero);
        $heroHp.textContent = `HP:${hero.hp}/${hero.maxHp}`;
        $monsterHp.textContent = `HP${monster.hp}/${monster.maxHp}`;
    } else if ($input === "2") {
        hero.heal(monster);
        $heroHp.textContent = `HP:${hero.hp}/${hero.maxHp}`;
    } else if ($input) {
        $battleMenu.style.display = "none";
        $gameMenu.style.display = "block";
        $monsterStart.style.display = "none";
    }
});
