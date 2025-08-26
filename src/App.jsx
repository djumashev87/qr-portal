
import { useState } from "react";
import QRCode from "react-qr-code";

export default function App() {
  const [tab, setTab] = useState("user");
  const [formData, setFormData] = useState({
    inventory: "",
    name: "",
    organization: "",
    position: "",
    category: "",
    type: "",
    description: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [adminLogin, setAdminLogin] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleUserSubmit = () => {
    if (Object.values(formData).every(Boolean)) {
      setIsSubmitted(true);
    } else {
      alert("Пожалуйста, заполните все поля");
    }
  };

  const handleAdminLogin = () => {
    if (adminLogin === "admin" && adminPass === "admin123") {
      setIsAdmin(true);
    } else {
      alert("Неверный логин или пароль");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex space-x-4 mb-4">
        <button
          className={tab === "user" ? "font-bold underline" : ""}
          onClick={() => setTab("user")}
        >
          User – Подать заявку
        </button>
        <button
          className={tab === "admin" ? "font-bold underline" : ""}
          onClick={() => setTab("admin")}
        >
          Admin
        </button>
      </div>

      {tab === "user" && (
        <div>
          {isSubmitted ? (
            <div className="text-center">
              <p>✅ Заявка успешно отправлена</p>
              <button className="mt-4 border px-4 py-2">Скачать форму заявки</button>
            </div>
          ) : (
            <form className="space-y-2">
              <input className="w-full border p-2" placeholder="Инвентарный номер" onChange={(e) => setFormData({ ...formData, inventory: e.target.value })} />
              <input className="w-full border p-2" placeholder="ФИО" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <input className="w-full border p-2" placeholder="Организация" onChange={(e) => setFormData({ ...formData, organization: e.target.value })} />
              <input className="w-full border p-2" placeholder="Должность" onChange={(e) => setFormData({ ...formData, position: e.target.value })} />
              <input className="w-full border p-2" placeholder="Категория заявки" onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
              <input className="w-full border p-2" placeholder="Тип" onChange={(e) => setFormData({ ...formData, type: e.target.value })} />
              <textarea className="w-full border p-2" placeholder="Краткое описание" onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
              <button type="button" className="w-full bg-blue-500 text-white py-2" onClick={handleUserSubmit}>Подать заявку</button>
            </form>
          )}
        </div>
      )}

      {tab === "admin" && (
        <div className="space-y-2">
          {!isAdmin ? (
            <>
              <input className="w-full border p-2" placeholder="Логин" onChange={(e) => setAdminLogin(e.target.value)} />
              <input className="w-full border p-2" type="password" placeholder="Пароль" onChange={(e) => setAdminPass(e.target.value)} />
              <button className="w-full bg-green-600 text-white py-2" onClick={handleAdminLogin}>Войти</button>
            </>
          ) : (
            <div>
              <p className="font-bold mb-2">Панель администратора</p>
              <p>📋 Здесь можно будет просматривать и редактировать данные о технике</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 text-center">
        <p className="mb-2 font-medium">📱 QR-код для доступа к этому сайту:</p>
        <div className="inline-block p-2 bg-white shadow">
          <QRCode value="https://qr-portal-rouge.vercel.app" />
        </div>
      </div>
    </div>
  );
}
