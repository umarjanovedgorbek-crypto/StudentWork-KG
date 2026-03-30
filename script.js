// 1. Маалыматтарды сактоо (State)
let state = {
    user: JSON.parse(localStorage.getItem('sw_pro_user')) || null,
    step: 1
};

// 2. Барак ачылганда текшерүү
window.onload = () => {
    if (state.user && state.user.finished) {
        startApp();
    } else {
        renderOnboarding();
    }
};

// 3. Авторизация кадамдары
function renderOnboarding() {
    const box = document.getElementById('auth-box');
    if (state.step === 1) {
        box.innerHTML = `
            <div class="text-center">
                <h1 class="text-4xl font-black text-slate-800 mb-6">StudentWork</h1>
                <input id="name-in" type="text" placeholder="Атыңыз" class="custom-input mb-4">
                <button onclick="toStep2()" class="btn-primary shadow-lg shadow-blue-100">Баштоо</button>
            </div>
        `;
    } else if (state.step === 2) {
        box.innerHTML = `
            <div class="text-center">
                <h2 class="text-2xl font-black mb-6">Кызыгуулар</h2>
                <div class="flex flex-wrap gap-2 justify-center mb-8">
                    <button class="px-4 py-2 border rounded-full text-sm font-bold">Дизайн</button>
                    <button class="px-4 py-2 border rounded-full text-sm font-bold">IT</button>
                    <button class="px-4 py-2 border rounded-full text-sm font-bold">SMM</button>
                </div>
                <button onclick="toStep3()" class="btn-primary">Кийинки</button>
            </div>
        `;
    } else if (state.step === 3) {
        box.innerHTML = `
            <div class="text-center">
                <h2 class="text-2xl font-black mb-8">Сиз кимсиз?</h2>
                <div class="grid grid-cols-2 gap-4 mb-8">
                    <div onclick="finish('Студент')" class="p-6 border-2 rounded-3xl cursor-pointer hover:border-blue-500 font-bold">Студент</div>
                    <div onclick="finish('Заказчы')" class="p-6 border-2 rounded-3xl cursor-pointer hover:border-blue-500 font-bold">Заказчы</div>
                </div>
            </div>
        `;
    }
}

function toStep2() { 
    const name = document.getElementById('name-in').value;
    if(!name) return alert("Атыңызды жазыңыз!");
    state.user = { name: name };
    state.step = 2; 
    renderOnboarding(); 
}

function toStep3() { state.step = 3; renderOnboarding(); }

function finish(role) {
    state.user.role = role;
    state.user.finished = true;
    localStorage.setItem('sw_pro_user', JSON.stringify(state.user));
    startApp();
}

// 4. Тиркемени иштетүү
function startApp() {
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('main-app').classList.remove('hidden');
    
    // Маалыматтарды толтуруу
    document.getElementById('user-avatar').innerText = state.user.name[0].toUpperCase();
    document.getElementById('profile-initials').innerText = state.user.name[0].toUpperCase();
    document.getElementById('profile-name').innerText = state.user.name;
    document.getElementById('profile-role').innerText = state.user.role;
}

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function logout() {
    localStorage.removeItem('sw_pro_user');
    location.reload();
}