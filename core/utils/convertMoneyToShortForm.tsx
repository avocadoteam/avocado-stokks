export const convertMoneyToShortForm = (money: number) => {
    if (money < 100000) {
        return `${money}`
    } if (money < 1000000000) {
        return `${Math.round(money / 1000000).toFixed(2)}M`
    } else {
        return `${Math.round(money / 1000000000).toFixed(2)}B`
    }
}
