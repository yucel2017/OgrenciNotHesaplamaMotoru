
let students = [];

let varMiLocalde = localStorage.getItem("students");

if (varMiLocalde) {

    students = JSON.parse(localStorage.getItem("students"));
} else {

    students = [];
}

const studentForm = document.querySelector("#student-form");


const studentList = document.querySelector("#student-list");


const addButton = document.querySelector(".ekle");

viewStudentList();


studentForm.addEventListener("submit", (e) => {


    e.preventDefault();


    const name = document.querySelector("#name").value;
    const surname = document.querySelector("#surname").value;
    const number = document.querySelector("#number").value;
    const vize = document.querySelector("#vize").value;
    const final = document.querySelector("#final").value;


    const newStudent = {
        ad: name,
        soyad: surname,
        no: number,
        vize: Number(vize),
        final: parseInt(final),
    };


    students.push(newStudent);

    console.log("HER YENI OGRENCIDEN BIRI", newStudent);


    studentForm.reset();


    savetoLocalStorage();


    viewStudentList();

    console.log("students", students);
});
console.log("Öğrenciler", students);


function viewStudentList() {

    const emptyList = document.querySelector(".empty");

    if (students.length) {


        if (emptyList) {
            emptyList.style.display = "none";
        }


        studentList.innerHTML = "";

        students.forEach((oAnkiOgrenci, index) => {


            const studentCard = `
           <div class="student-item-info">
               <h3>${oAnkiOgrenci.ad} ${oAnkiOgrenci.soyad} - ${oAnkiOgrenci.no
                }</h3>
               <span>Vize: ${oAnkiOgrenci.vize} Final: ${oAnkiOgrenci.final
                }</span>
               <p>Ortalama: ${(
                    (oAnkiOgrenci.vize + oAnkiOgrenci.final) /
                    2
                ).toFixed(2)}</p>
           </div>
           <div class="student-item-process">
               <i class="fa-solid fa-pen-to-square edit-button" onclick='editStudent(${index})'></i>
               <i class="fa-solid fa-trash delete-button" onclick='deleteStudent(${index})'></i>
           </div>
            `;


            const studenItem = document.createElement("div");
            studenItem.classList.add("student-item");
            studenItem.innerHTML = studentCard;

            const ortalama = ((oAnkiOgrenci.vize + oAnkiOgrenci.final) / 2).toFixed(
                2
            );
            if (ortalama > 80) {

                studenItem.style.background = "#15aefe";
            } else if (ortalama > 60) {

                studenItem.style.background = "#f47121";
            } else if (ortalama > 45) {

                studenItem.style.background = "#630eff";
            } else {

                studenItem.style.background = "#ff0fe4";

            }


            studentList.appendChild(studenItem);
        });
    } else {

        console.log("bos");

        const forEmpty = `
            <p class="empty">Listenizde öğrenci bulunmamaktadır.</p>
        `;

        studentList.innerHTML = forEmpty;
    }
}


function deleteStudent(gelenIndex) {
    console.log('gelenIndex', gelenIndex)


    console.log("Students=>", students);

    const sonuc = students.filter((oankiDeger, index) => {


        return index !== gelenIndex;
    });


    const silinecekOgr = students.find(
        (oankiDeger, index) => index === gelenIndex
    );
    console.log("silinecekOgr", silinecekOgr);

    Toastify({
        text: `${silinecekOgr.ad} Adındaki öğrenci listeden silindi!`,
        duration: 1500,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();



    students = sonuc;

    savetoLocalStorage();

    viewStudentList();
}

function editStudent(gelenIndex) {

    const editStudent = students.find(
        (oAnkiOgrenci, index) => index === gelenIndex
    );
    console.log("editStudent", editStudent);


    document.querySelector("#name").value = editStudent.ad;
    document.getElementById("surname").value = editStudent.soyad;
    document.getElementById("number").value = editStudent.no;
    document.getElementById("vize").value = editStudent.vize;
    document.querySelector("#final").value = editStudent.final;


    deleteStudent(gelenIndex);


    savetoLocalStorage();
}


function savetoLocalStorage() {
    localStorage.setItem("students", JSON.stringify(students));
}

let dizi = [1, 2, 3, 2, 5, 2, 2];


const result = dizi.filter((item, index) => item !== 2);

const result2 = dizi.find((item, index) => index === 0);

const result3 = dizi.map((item, index) => item * 10);
