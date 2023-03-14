let a = document.getElementById("user_form");
const save_data = (x) => {
    x.preventDefault();
    const p = document.getElementById("name").value;
    const q = document.getElementById("email").value;
    const r = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const t = document.getElementById("acceptTerms").checked;
    const entry = {
        p,
        q,
        r,
        dob,
        t
    };
    userEntries.push(entry);
    localStorage.setItem("user_entries", JSON.stringify(userEntries));
    display_data();
}

const retrieve_data = () => {
    let entries = localStorage.getItem("user_entries");
    if (entries) {
        entries = JSON.parse(entries);
    }
    else {
        entries = [];
    }
    return entries;
}

let userEntries = retrieve_data();
const display_data = () => {
    const entries = retrieve_data();
    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class='border px-4 py-2'>${entry.p}</td>`;
        const emailCell = `<td class='border px-4 py-2'>${entry.q}</td>`;
        const passwordCell = `<td class='border px-4 py-2'>${entry.r}</td>`;
        const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
        const acceptTermsCell = `<td class='border px-4 py-2'>${entry.t}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");
    const table = `<table class="table-auto w-full"><tr>
    <th class="px-6 py-3">Name</th>
    <th class="px-6 py-3">Email</th>
    <th class="px-6 py-3">Password</th>
    <th class="px-6 py-3">Dob</th>
    <th class="px-6 py-3">Accepted terms?</th>
    </tr>${tableEntries}</table>`;
    let details = document.getElementById("user_entries");
    details.innerHTML = table;
}

a.addEventListener("submit", save_data);
console.log(document.getElementById("name").value);
display_data();

const today = new Date();
const min = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
const max = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
dob.setAttribute("min", min.toISOString().slice(0, 10));
dob.setAttribute("max", max.toISOString().slice(0, 10));
dob.addEventListener("change", () => {
    const age = Math.floor((new Date() - new Date(dob).getTime()) / 3.15576e+10);
    if (age < 18 || age > 55) {
        dob.setCustomValidity("Please enter age between 18 & 55");
    } else {
        dob.setCustomValidity("");
    }
});