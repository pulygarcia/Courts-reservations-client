export const formatCurrency = (amount:number) => amount.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
})

export const getChargesList = async () => {
    const req = await fetch(`${process.env.API_BASE_URL}/charges`)
    const res = await req.json();

    return res
}

export const getItemById = async (id:number) => {
    const req = await fetch(`${process.env.API_BASE_URL}/charges/${id}`)
    const res = await req.json();

    return res
}