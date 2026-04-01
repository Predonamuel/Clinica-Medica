document.getElementById('consultaForm').addEventListener('submit', function (e) {
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const telefone = document.getElementById('telefone').value
    const especialidade = document.getElementById('especialidade').value
    const data = document.getElementById('data').value
    const hora = document.getElementById('hora').value
    const mensagem = document.getElementById('mensagem').value

    const numeroWhatsApp = '5516994063922'

    const texto =
        `Olá! Gostaria de agendar uma consulta:\n\n` +
        `👤 Nome: ${nome}\n` +
        `📧 E-mail: ${email}\n` +
        `📞 Telefone: ${telefone}\n` +
        `💉 Especialidade: ${especialidade}\n` +
        `📅 Data: ${data}\n` +
        `⏰ Hora: ${hora}\n` +
        (mensagem ? `💬 Mensagem: ${mensagem}\n` : '')

    const confirmacao =
        `Confirme suas informações:\n\n` +
        `Nome: ${nome}\n` +
        `E-mail: ${email}\n` +
        `Telefone: ${telefone}\n` +
        `Especialidade: ${especialidade}\n` +
        `Data: ${data}\n` +
        `Hora: ${hora}\n` +
        (mensagem ? `Mensagem: ${mensagem}\n\n` : '\n') +
        `Deseja enviar essas informações pelo WhatsApp?`

    if (confirm(confirmacao)) {
        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`
        window.open(url, '_blank')
    }
})
