function main() {
  const api = "https://notes-api.dicoding.dev/v2";
  const getNotes = async () => {
    // tuliskan kode di sini!
    const response = await fetch(`${api}/notes`);
    const responseJSON = await response.json();

    if (responseJSON.error) {
      showResponseMessage(responseJSON.message);
    } else {
      console.log(responseJSON.data);
      renderAllNotes(responseJSON.data);
    }
  };

  const insertnote = async (note) => {
    // tuliskan kode di sini!
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      };

      const response = await fetch(`${api}/notes`, options);
      const responseJson = await response.json();
      showResponseMessage(responseJson.message);
      getNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const updatenote = (note) => {
    // tuliskan kode di sini!
  };

  const removenote = (noteId) => {
    // tuliskan kode di sini!
  };

  /*
      jangan ubah kode di bawah ini ya!
  */

  const renderAllNotes = (notes) => {
    const listBookElement = document.querySelector("#listnote");
    listBookElement.innerHTML = "";

    notes.forEach((note) => {
      listBookElement.innerHTML += `
            <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
              <div class="card">
                <div class="card-body">
                  <h5> ${note.title}</h5>
                  <p>${note.body}</p>
                  <button type="button" class="btn btn-danger button-delete" id="${note.id}">Hapus</button>
                </div>
              </div>
            </div>
          `;
    });

    const buttons = document.querySelectorAll(".button-delete");
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const noteId = event.target.id;

        removenote(noteId);
      });
    });
  };

  const showResponseMessage = (message = "Check your internet connection") => {
    alert(message);
  };

  document.addEventListener("DOMContentLoaded", () => {
    const noteForm = document.getElementById("form");

    const inputnoteId = document.querySelector("#inputnoteId");
    const inputnoteTitle = document.querySelector("#inputnoteTitle");
    const inputnoteBody = document.querySelector("#inputnoteBody");
    const buttonSave = document.querySelector("#buttonSave");
    const buttonUpdate = document.querySelector("#buttonUpdate");

    noteForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const randomText =
        generateRandomString(10) + "-" + generateRandomString(10);
      console.log(randomText);
      buttonSave.addEventListener("click", function () {
        const note = {
          id: `note-${randomText}`,
          title: inputnoteTitle.value.toString(),
          body: inputnoteBody.value.toString(),
          archived: false,
          createdAt: new Date().toISOString(),
        };
        insertnote(note);
      });
    });

    function generateRandomString(length) {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    }

    const resetForm = () => {
      inputnoteId.value = "";
      inputnoteTitle.value = "";
      inputnoteBody.value = "";
    };

    getNotes();
  });
}

export default main;
