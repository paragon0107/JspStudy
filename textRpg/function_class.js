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

class Game {
    constructor(name) {
        this.monster;
        this.hero = new Hero(this, name);
        this.monsterList = [
            {
                name: "슬라임",
                hp: 25,
                att: 10,
                xp: 10,
            },
            {
                name: "스켈레톤",
                hp: 50,
                att: 15,
                xp: 20,
            },
            {
                name: "마왕",
                hp: 150,
                att: 35,
                xp: 50,
            },
        ];
        this.start();
    }
    start() {
        $gameMenu.addEventListener("submit", this.onGameMenuInput);
        $battleMenu.addEventListener("submit", this.onBattleMenu);
        this.changeScreen("game");
        this.updateHeroStat();
    }
    changeScreen(screen) {
        if (screen === "start") {
            $startScreen.style.display = "block";
            $gameMenu.style.display = "none";
            $battleMenu.style.display = "none";
        } else if (screen === "game") {
            $startScreen.style.display = "none";
            $gameMenu.style.display = "block";
            $battleMenu.style.display = "none";
        } else if (screen === "battle") {
            $startScreen.style.display = "none";
            $gameMenu.style.display = "none";
            $battleMenu.style.display = "block";
        }
    }
    onGameMenuInput = (event) => {
        event.preventDefault();
        const $input = event.target["menu_input"].value;
        if ($input === "1") {
            this.changeScreen("battle");
            const randomIndex = Math.floor(
                Math.random() * this.monsterList.length
            );
            const randomMonster = this.monsterList[randomIndex];
            this.monster = new Monster(
                this,
                randomMonster.name,
                randomMonster.hp,
                randomMonster.att,
                randomMonster.xp
            );
            this.updateMonsterStat();
            this.showMessage(
                `몬스터와 마주쳤다! ${this.monster.name}인 것 같다!`
            );
        } else if ($input === "2") {
            this.showMessage(
                `휴식을 취하여 ${
                    this.hero.maxHp - this.hero.hp
                }를 회복했습니다!`
            );
            this.hero.hp = this.hero.maxHp;
            this.updateHeroStat();
        } else if ($input === "3") {
            this.quit();
            this.showMessage("모험을 마칩니다.");
        }
    };
    onBattleMenu = (event) => {
        event.preventDefault();
        const $input = event.target["battle_input"].value;
        if ($input === "1") {
            const { hero, monster } = this;
            hero.attack(monster);
            monster.attack(hero);
            if (hero.hp <= 0) {
                this.showMessage(
                    `${hero.lev}레벨에서 전사. 새 주인공을 생성하세요..`
                );
                this.quit();
            } else if (monster.hp <= 0) {
                this.showMessage(
                    `몬스터를 잡아 ${monster.xp} 경험치를 획득했다!`
                );
                hero.getXp(monster.xp);
                this.monster = null;
                this.changeScreen("game");
            } else {
                this.showMessage(
                    `${hero.att}의 데미지를 주고 ${monster.att}의 피해를 입었다.`
                );
            }

            this.updateHeroStat();
            this.updateMonsterStat();
        } else if ($input === "2") {
            if (this.hero.hp <= this.hero.maxHp - 20) {
                this.hero.hp += 20;
                this.showMessage(`hp 20을 회복을 회복했습니다!`);
            } else {
                this.showMessage(
                    `${this.hero.maxHp - this.hero.hp}을 회복했습니다!`
                );
                this.hero.hp = this.hero.maxHp;
            }
            this.updateHeroStat();
        } else if ($input === "3") {
            this.showMessage("성공적으로 도망쳤습니다.");
            this.monster = null;
            this.updateMonsterStat();
            this.changeScreen("game");
        }
    };
    updateHeroStat() {
        const { hero } = this;
        if (hero === null) {
            $heroName.textContent = "";
            $heroLevel.textContent = "";
            $heroHp.textContent = "";
            $heroXp.textContent = "";
            $heroAtt.textContent = "";
            return;
        }
        $heroName.textContent = hero.name;
        $heroLevel.textContent = `${hero.lev}Lev`;
        $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
        $heroXp.textContent = `XP: ${hero.xp}/${15 * hero.lev}`;
        $heroAtt.textContent = `ATT:${hero.att}`;
    }
    updateMonsterStat() {
        const { monster } = this;
        if (monster === null) {
            $monsterName.textContent = "";
            $monsterHp.textContent = "";
            $monsterAtt.textContent = "";
            return;
        }
        $monsterName.textContent = monster.name;
        $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
        $monsterAtt.textContent = `ATT:${monster.att}`;
    }
    showMessage(text) {
        $message.textContent = text;
    }
    quit() {
        this.hero = null;
        this.monster = null;
        this.updateHeroStat();
        this.updateMonsterStat();
        $gameMenu.removeEventListener("submit", this.onGameMenuInput);
        $battleMenu.removeEventListener("submit", this.onBattleMenu);
        this.changeScreen("start");
        game = null;
    }
}
class Unit {
    constructor(game, name, hp, att, xp) {
        this.game = game;
        this.name = name;
        this.maxHp = hp;
        this.xp = xp;
        this.att = att;
    }
    attack(target) {
        target.hp -= this.att;
    }
}
class Hero extends Unit {
    constructor(game, name) {
        super(game, name, 100, 10, 0);
        this.lev = 1;
    }

    heal(monster) {
        this.hp += 20;
        this.hp -= monster.att;
    }
    getXp(xp) {
        this.xp += xp;
        if (this.xp >= this.lev * 15) {
            this.xp -= this.lev * 15;
            this.lev += 1;
            this.maxHp += 5;
            this.att += 5;
            this.hp = this.maxHp;
            this.game.showMessage(`레벨업!! 레벨${this.lev}`);
        }
    }
}
class Monster extends Unit {
    constructor(game, name, hp, att, xp) {
        super(game, name, hp, att, xp);
    }
}
let game = null;
$startScreen.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = event.target["name_input"].value;
    game = new Game(name);
    game.showMessage("");
});
