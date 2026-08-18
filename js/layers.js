addLayer("ach", {
    name: "achievements",
    symbol: "A",
    row: "side",
    position: 0,
    startData() {return {
        unlocked: true,
    }},
    color: "#ff9100",
    type: "none",
    resource: "achievements",
    infoboxes: {
    lore: {
        title: "Achievements",
        body() { return "Review your completions here!" },
        },
    },
    achievements: {
        rows: 9,
        cols: 9,
        achievementPopups: false,
        11: {
            name: "First one's always free!",
            tooltip: "Start playing.",
            done() {return player.points.gte(0)},
        },
        12: {
            name: "First nothing...",
            tooltip: "Get one of nothing.",
            done() {return player.points.gte(1)},
        },
        13: {
            name: "...then still nothing",
            tooltip: "Get ten of nothing.",
            done() {return player.points.gte(10)},
            
        },
        14: {
            name: "Basic Deeds",
            tooltip: "Get one base point.",
            done() {return player.b.points.gte(1)},
            
        },
        15: {
            name: "Buyables Lover",
            tooltip: "Purchase the first upgrade.",
            done() {if (hasUpgrade('b', 11)) return true},
        },
        16: {
            name: "Self Recursion",
            tooltip: "Purchase the second upgrade.",
            done() {if (hasUpgrade('b', 12)) return true},
        },
        17: {
            name: "The game just started vro😭✌️",
            tooltip: "Meet the first softcap.",
            done() {return getPointGen().gte(10)},
        },
        19: {
            name: "Nothingness Multi- millionaire",
            tooltip: "Get a million of nothing per second. <big>SOFTCAP 2.</big>",
            done() {return getPointGen().gte(1000000)},
        },
        18: {
            name: "Upgrade Buyer",
            tooltip: "Complete Row 1 of Base Point Upgrades.",
            done() {if (hasUpgrade('b', 15)) return true},
        },
        21: {
            name: "Full Base Set",
            tooltip: "Get all Possible Buyables in Node 1 of Row 0.",
            done() {if (hasUpgrade('b', 21)) return true},
        },
        22: {
            name: "Prestigement",
            tooltip: "Prestige for the first time. <br> Reward: Prestige permanently stays.",
            done() {return player.p.points.gte(1)},
        },
    },
})
addLayer("b", {
    name: "base", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#a3f4ff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "base points", // Name of prestige currency
    baseResource: "of nothing", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    infoboxes: {
    lore: {
        title: "Base Points <i>(Row 0, Node 1/2)</i>",
        body() { return "The <b><i>VERY</b></i> first layer of the game.<br> <i>This is the start of your very adventure, mortal. Good luck on your journey.</i>" },
        },
    },
    upgrades: {
        11: {
            title: "B01: A Sweet Beginning",
            description: "Doubles your nothingness gain. Simple. Also unlocks the first 2 buyables.",
            cost: new Decimal(1)
        },
        12: {
            title: "B02: Paranormal",
            description: "Nothingness gets boosted on its own. Also unlocks Buyable 3.<br>",
            cost: new Decimal(25),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        13: {
            title: "B03: Self-Boosted",
            description: "Base Points get boosted on their own. Also unlocks Buyables 4 and 5.<br>",
            cost: new Decimal(250),
            effect() {
                return player.b.points.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        14: {
            title: "B04: Neat Boost Apedemy",
            description: "x5 Nothingness.",
            cost: new Decimal(10000),
        },
        15: {
            title: "B05: Extension Pack",
            description: "x2 Base Points. Also unlocks 5 more upgrades!",
            cost: new Decimal(250000),
        },
        21: {
            title: "B06: Buyable Mania",
            description: "Unlocks 5 Stronger Buyables!",
            cost: new Decimal(1000000),
            unlocked() {if (hasUpgrade('b', 15)) return true},
        },
        22: {
            title: "B07: Empty Voidality",
            description: "x3 Nothingness",
            cost: new Decimal(500000000),
            unlocked() {if (hasUpgrade('b', 15)) return true},
        },
        23: {
            title: "B08: Recursive Nothingness.exe",
            description: "Nothingness boosts itself again.",
            cost: new Decimal(1e10),
            unlocked() {if (hasUpgrade('b', 15)) return true},
            effect() {
                return player.points.add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        24: {
            title: "B09: Recursive Base.exe",
            description: "Base Points boost themselves again.",
            cost: new Decimal(1e12),
            unlocked() {if (hasUpgrade('b', 15)) return true},
            effect() {
                return player.b.points.add(1).pow(0.035)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        25: {
            title: "B10: New Row",
            description: "Unlock a new Layer.",
            cost: new Decimal(1e13),
            unlocked() {if (hasUpgrade('b', 15)) return true},
        },
    },
    buyables: {
    11: {
        unlocked() {if (hasUpgrade('b', 11)) return true},
        title: "Fragilance",
        purchaseLimit: new Decimal(15), 
        
        cost(x) { 
            let amt = x || getBuyableAmount(this.layer, this.id);
            return new Decimal(1.5).pow(amt); // Cost increases by 10x each level
        },
        
        effect(x) {
            let amt = x || getBuyableAmount(this.layer, this.id);
            return new Decimal(1.2).pow(amt); // 1.2x multiplier per level
        },
        
        canAfford() { 
            return player[this.layer].points.gte(this.cost()); 
        },
        
        buy() {
            let cost = this.cost();
            if (!this.canAfford()) return;
            player[this.layer].points = player[this.layer].points.sub(cost);
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
        },
        
        display() {
            let amt = getBuyableAmount(this.layer, this.id);
            let eff = this.effect(amt);
            return `<br>x1.2 Nothingness gain per purchase.<br>
                    Current Effect: x${format(eff)} nothingness<br>
                    Cost: ${format(this.cost())} base points<br>
                    Bought: ${format(amt)} / 15.00`;
            }
        },
        
        12: {
        unlocked() {if (hasUpgrade('b', 11)) return true},
        title: "Based on a True Story",
        purchaseLimit: new Decimal(15), 
        
        cost(x) { 
            let amt = x || getBuyableAmount(this.layer, this.id);
            return new Decimal(1.4).pow(amt); // Cost increases by 10x each level
        },
        
        effect(x) {
            let amt = x || getBuyableAmount(this.layer, this.id);
            return new Decimal(1.1).pow(amt); // 1.2x multiplier per level
        },
        
        canAfford() { 
            return player[this.layer].points.gte(this.cost()); 
        },
        
        buy() {
            let cost = this.cost();
            if (!this.canAfford()) return;
            player[this.layer].points = player[this.layer].points.sub(cost);
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
        },
        
        display() {
            let amt = getBuyableAmount(this.layer, this.id);
            let eff = this.effect(amt);
            return `<br>x1.1 Base Point gain per purchase.<br>
                    Current Effect: x${format(eff)} base points<br>
                    Cost: ${format(this.cost())} base points<br>
                    Bought: ${format(amt)} / 15.00`;
            }
        },
        
        13: {
        unlocked() {if (hasUpgrade('b', 12)) return true},
        title: "Superrecursion",
        purchaseLimit: new Decimal(25), 
        
        cost(x) { 
            let amt = x || getBuyableAmount(this.layer, this.id);
            return new Decimal(1.25).pow(amt); // Cost increases by 10x each level
        },
        
        effect(x) {
            let amt = x || getBuyableAmount(this.layer, this.id);
            return player.points.add(1).pow(0.015).pow(amt); // 1.2x multiplier per level
        },
        
        canAfford() { 
            return player[this.layer].points.gte(this.cost()); 
        },
        
        buy() {
            let cost = this.cost();
            if (!this.canAfford()) return;
            player[this.layer].points = player[this.layer].points.sub(cost);
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
        },
        
        display() {
            let amt = getBuyableAmount(this.layer, this.id);
            let eff = this.effect(amt);
            return `<br>Slightly increases the self-nothingness boost per purchase.<br>
                    Current Effect: x${format(eff)} nothingness<br>
                    Cost: ${format(this.cost())} base points<br>
                    Bought: ${format(amt)} / 25.00`;
            }
        },
        14: {
        unlocked() {if (hasUpgrade('b', 13)) return true},
        title: "Superbasic Deeds",
        purchaseLimit: new Decimal(25), 
        
        cost(x) { 
            let amt = x || getBuyableAmount(this.layer, this.id);
            return new Decimal(1.35).pow(amt); // Cost increases by 10x each level
        },
        
        effect(x) {
            let amt = x || getBuyableAmount(this.layer, this.id);
            return player.b.points.add(1).pow(0.015).pow(amt); // 1.2x multiplier per level
        },
        
        canAfford() { 
            return player[this.layer].points.gte(this.cost()); 
        },
        
        buy() {
            let cost = this.cost();
            if (!this.canAfford()) return;
            player[this.layer].points = player[this.layer].points.sub(cost);
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
        },
        
        display() {
            let amt = getBuyableAmount(this.layer, this.id);
            let eff = this.effect(amt);
            return `<br>Slightly increases the self-base point boost per purchase.<br>
                    Current Effect: x${format(eff)} base points<br>
                    Cost: ${format(this.cost())} base points<br>
                    Bought: ${format(amt)} / 25.00`;
            }
        },
        15: {
        unlocked() {if (hasUpgrade('b', 13)) return true},
        title: "Great Hypermarket",
        purchaseLimit: new Decimal(50), 
        
        cost(x) { 
            let amt = x || getBuyableAmount(this.layer, this.id);
            return new Decimal(1.5).pow(amt); // Cost increases by 10x each level
        },
        
        effect(x) {
            let amt = x || getBuyableAmount(this.layer, this.id);
            return new Decimal(1.05).pow(amt); // 1.2x multiplier per level
        },
        
        canAfford() { 
            return player[this.layer].points.gte(this.cost()); 
        },
        
        buy() {
            let cost = this.cost();
            if (!this.canAfford()) return;
            player[this.layer].points = player[this.layer].points.sub(cost);
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
        },
        
        display() {
            let amt = getBuyableAmount(this.layer, this.id);
            let eff = this.effect(amt);
            return `<br>Slightly increases both self boosts per purchase.<br>
                    Current Effect: x${format(eff)} base points and nothingness<br>
                    Cost: ${format(this.cost())} base points<br>
                    Bought: ${format(amt)} / 50.00`;
            }
        },
        21: {
        unlocked() {if (hasUpgrade('b', 21)) return true},
        title: "Great Fragilance",
        purchaseLimit: new Decimal(45), 
        
        cost(x) { 
            let amt = x || getBuyableAmount(this.layer, this.id);
            return new Decimal(1.5).pow(amt); // Cost increases by 10x each level
        },
        
        effect(x) {
            let amt = x || getBuyableAmount(this.layer, this.id);
            return new Decimal(1.02).pow(amt); // 1.2x multiplier per level
        },
        
        canAfford() { 
            return player[this.layer].points.gte(this.cost()); 
        },
        
        buy() {
            let cost = this.cost();
            if (!this.canAfford()) return;
            player[this.layer].points = player[this.layer].points.sub(cost);
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
        },
        
        display() {
            let amt = getBuyableAmount(this.layer, this.id);
            let eff = this.effect(amt);
            return `<br>x1.02 Nothingness gain per purchase.<br>
                    Current Effect: x${format(eff)} nothingness<br>
                    Cost: ${format(this.cost())} base points<br>
                    Bought: ${format(amt)} / 45.00`;
            }
        },
        22: {
        unlocked() {if (hasUpgrade('b', 21)) return true},
        title: "Great True Story",
        purchaseLimit: new Decimal(45), 
        
        cost(x) { 
            let amt = x || getBuyableAmount(this.layer, this.id);
            return new Decimal(1.45).pow(amt); // Cost increases by 10x each level
        },
        
        effect(x) {
            let amt = x || getBuyableAmount(this.layer, this.id);
            return new Decimal(1.01).pow(amt); // 1.2x multiplier per level
        },
        
        canAfford() { 
            return player[this.layer].points.gte(this.cost()); 
        },
        
        buy() {
            let cost = this.cost();
            if (!this.canAfford()) return;
            player[this.layer].points = player[this.layer].points.sub(cost);
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
        },
        
        display() {
            let amt = getBuyableAmount(this.layer, this.id);
            let eff = this.effect(amt);
            return `<br>x1.01 Base Point gain per purchase.<br>
                    Current Effect: x${format(eff)} base points<br>
                    Cost: ${format(this.cost())} base points<br>
                    Bought: ${format(amt)} / 45.00`;
            }
        },
        23: {
        unlocked() {if (hasUpgrade('b', 21)) return true},
        title: "Great Superrecursion",
        purchaseLimit: new Decimal(75), 
        
        cost(x) { 
            let amt = x || getBuyableAmount(this.layer, this.id);
            return new Decimal(1.5).pow(amt); // Cost increases by 10x each level
        },
        
        effect(x) {
            let amt = x || getBuyableAmount(this.layer, this.id);
            return player.points.add(1).pow(0.003).pow(amt); // 1.2x multiplier per level
        },
        
        canAfford() { 
            return player[this.layer].points.gte(this.cost()); 
        },
        
        buy() {
            let cost = this.cost();
            if (!this.canAfford()) return;
            player[this.layer].points = player[this.layer].points.sub(cost);
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
        },
        
        display() {
            let amt = getBuyableAmount(this.layer, this.id);
            let eff = this.effect(amt);
            return `<br>Barely increases the self-nothingness boost per purchase.<br>
                    Current Effect: x${format(eff)} nothingness<br>
                    Cost: ${format(this.cost())} base points<br>
                    Bought: ${format(amt)} / 75.00`;
            }
        },
        24: {
        unlocked() {if (hasUpgrade('b', 21)) return true},
        title: "Great Superbasic Deeds",
        purchaseLimit: new Decimal(75), 
        
        cost(x) { 
            let amt = x || getBuyableAmount(this.layer, this.id);
            return new Decimal(1.4).pow(amt); // Cost increases by 10x each level
        },
        
        effect(x) {
            let amt = x || getBuyableAmount(this.layer, this.id);
            return player.b.points.add(1).pow(0.002).pow(amt); // 1.2x multiplier per level
        },
        
        canAfford() { 
            return player[this.layer].points.gte(this.cost()); 
        },
        
        buy() {
            let cost = this.cost();
            if (!this.canAfford()) return;
            player[this.layer].points = player[this.layer].points.sub(cost);
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
        },
        
        display() {
            let amt = getBuyableAmount(this.layer, this.id);
            let eff = this.effect(amt);
            return `<br>Barely increases the self-base points boost per purchase.<br>
                    Current Effect: x${format(eff)} base points<br>
                    Cost: ${format(this.cost())} base points<br>
                    Bought: ${format(amt)} / 75.00`;
            }
        },
        25: {
        unlocked() {if (hasUpgrade('b', 21)) return true},
        title: "Great Great Hypermarket",
        purchaseLimit: new Decimal(150), 
        
        cost(x) { 
            let amt = x || getBuyableAmount(this.layer, this.id);
            return new Decimal(1.4).pow(amt); // Cost increases by 10x each level
        },
        
        effect(x) {
            let amt = x || getBuyableAmount(this.layer, this.id);
            return new Decimal(1.015).pow(amt); // 1.2x multiplier per level
        },
        
        canAfford() { 
            return player[this.layer].points.gte(this.cost()); 
        },
        
        buy() {
            let cost = this.cost();
            if (!this.canAfford()) return;
            player[this.layer].points = player[this.layer].points.sub(cost);
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
        },
        
        display() {
            let amt = getBuyableAmount(this.layer, this.id);
            let eff = this.effect(amt);
            return `<br>Barely increases both self boosts per purchase.<br>
                    Current Effect: x${format(eff)} base points<br>
                    Cost: ${format(this.cost())} base points<br>
                    Bought: ${format(amt)} / 150.00`;
            }
        },
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (buyableEffect('b', 12)) mult = mult.times(buyableEffect('b', 12))
        if (buyableEffect('b', 14)) mult = mult.times(buyableEffect('b', 14))
        if (buyableEffect('b', 15)) mult = mult.times(buyableEffect('b', 15))
        if (hasUpgrade('b', 15)) mult = mult.times(2)
        if (buyableEffect('b', 22)) mult = mult.times(buyableEffect('b', 22))
        if (buyableEffect('b', 24)) mult = mult.times(buyableEffect('b', 24))
        if (buyableEffect('b', 25)) mult = mult.times(buyableEffect('b', 25))
        if (hasUpgrade('b', 24)) mult = mult.times(upgradeEffect('b',24))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for base points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
addLayer("p", {
    branches: ["b"],
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Pr", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#0084ff",
    requires: new Decimal(1e7), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "of nothing", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    infoboxes: {
    lore: {
        title: "Prestige Points <i>(Row 1, Node 1/3)</i>",
        body() { return "The <b><i>VERY</b></i> first prestige layer of the game.<br> <i>Glad you made it here. Sorry this took you a while. As a reward, I would like to give you a 5x boost on nothingness.</i>" },
        },
    },
    upgrades: {
        11: {
            title: "Pr01: Plain Simple Boost",
            description: "x5s your nothingness gain.",
            cost: new Decimal(1)
        },
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {
        if (hasUpgrade('b', 25)) return true
        if (hasAchievement('ach', 22)) return true
        return false
    },
    unlocked() { 
    return player.points.gte(1e7) || hasAchievement('ach', 22) 
    },
})