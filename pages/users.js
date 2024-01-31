import User from "@/components/user";
import React from "react";

const UserList = ({ users }) => {
  return (
    <div>
      <h2>List of Users</h2>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <User user={user} />
          </div>
        );
      })}
    </div>
  );
};

export default UserList;

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  //   console.log(data);

  return {
    props: {
      users: data,
    },
  };
}
