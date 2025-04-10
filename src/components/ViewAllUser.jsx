import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import userAPI from "../services/Api/UserService";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const fetchUser = () => {
    userAPI
      .getAll()
      .then((res) => {
        // console.log(res['data']['response'])
        setUsers(res["data"]["response"]);
      })
      .catch((e) => {
        console.log(e);
        toast.error("Don't view now");
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const deleteuser = (userId) => {
    userAPI
      .delete(userId)
      .then((res) => {
        // console.log(res['data']['response']);
        toast.success(res["data"]["response"]);
        fetchUser();
      })
      .catch((e) => {
        console.log(e);
        toast.error("Don't delete this user");
      });
  };

  return (
    <>
      <div>
        <h1 className="text-success mt-3 ms-4 mb-3">Theaters</h1>
        
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Phonenumber</th>
              <th>BirthDay</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => user.username !== "admin")
              .map((user) => (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td>{user.username}</td>
                  <td>{user.phonenumber}</td>
                  <td>{user.dob}</td>
                  <td>
                    <Link
                      to={`/admin/user/${user.id}`}
                      className="btn btn-primary text-white text-decoration-none me-2"
                    >
                      Sửa
                    </Link>
                    <Link
                      onClick={() => deleteuser(user.id)}
                      className="btn btn-danger text-white text-decoration-none"
                    >
                      Xóa
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllUsers;
