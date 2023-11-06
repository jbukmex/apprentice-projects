function checkCashRegister(price, cash, cid) {
    // Define currency values in cents
    const currencyUnit = {
      "PENNY": 1,
      "NICKEL": 5,
      "DIME": 10,
      "QUARTER": 25,
      "ONE": 100,
      "FIVE": 500,
      "TEN": 1000,
      "TWENTY": 2000,
      "ONE HUNDRED": 10000
    };
  
    // Calculate change due in cents
    let changeDue = (cash - price) * 100;
  
    // Calculate the total amount in the cash-in-drawer in cents
    let totalInDrawer = 0;
    for (const [unit, amount] of cid) {
      totalInDrawer += amount * 100;
    }
  
    // Handle different cases
    if (changeDue > totalInDrawer) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else if (changeDue === totalInDrawer) {
      return { status: "CLOSED", change: cid };
    } else {
      let change = [];
  
      for (let i = cid.length - 1; i >= 0; i--) {
        const [unit, amount] = cid[i];
        const unitValue = currencyUnit[unit];
        let unitAvailable = amount * 100;
        let unitUsed = 0;
  
        while (unitAvailable > 0 && changeDue >= unitValue) {
          changeDue -= unitValue;
          unitAvailable -= unitValue;
          unitUsed += unitValue;
          changeDue = Math.round(changeDue * 100) / 100;
        }
  
        if (unitUsed > 0) {
          change.push([unit, unitUsed / 100]);
        }
      }
  
      if (changeDue === 0) {
        return { status: "OPEN", change };
      } else {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
      }
    }
  }
      
      console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));