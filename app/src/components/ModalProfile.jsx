export const ModalProfile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-96">
        <h2 className="text-center text-xl font-semibold">Profile</h2>
        <div className="mt-4">
          <p>
            <img src={user.avatar} alt={user.username} className="h-20 w-20 rounded-full mx-auto" />
          </p>
          <p>
            <span className="font-semibold">Name:</span> {user.firstName} {user.lastName}
          </p>
          <p>
            <span className="font-semibold">Username:</span> {user.username}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
        </div>
      </div>
    </div>
  );
}