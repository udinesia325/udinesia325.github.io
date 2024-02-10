function sendWhatsapp( message = 'test', phone = 6283119803061){
    return `https://api.whatsapp.com/send/?phone=${phone}&text=${message}`
}

export default sendWhatsapp