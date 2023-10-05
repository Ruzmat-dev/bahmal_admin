

// const CatalogEdit = () => {
//   // UPDATE action
//   const handleSaveUser: MRT_TableOptions<User>['onEditingRowSave'] = async ({
//     values,
//     table,
//   }) => {
//     const newValidationErrors = validateUser(values);
//     if (Object.values(newValidationErrors).some((error) => error)) {
//       setValidationErrors(newValidationErrors);
//       return;
//     }
//     setValidationErrors({});
//     await updateUser(values);
//     table.setEditingRow(null); //exit editing mode
//   };

//   // ...

//   // Add this function to your component
//   async function updateUser(updatedUser: User) {
//     try {
//       // Send an API request to update the user data
//       const response = await fetch(`/api/users/${updatedUser.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedUser),
//       });

//       if (!response.ok) {
//         // Handle the case where the update request fails
//         throw new Error('Failed to update user');
//       }

//       // Update the user data in the component's state or refetch the user data
//       // This depends on how you manage your data in your app
//       // For example, you can refetch the data with a query here if you're using React Query

//       // Exit editing mode (you can use the table object to control this)
//       // table.setEditingRow(null);

//       // Optionally, show a success message
//       toast.success('User updated successfully');
//     } catch (error) {
//       // Handle errors here, e.g., show an error message
//       console.error('Error updating user:', error);
//       toast.error('Failed to update user');
//     }
//   }

//   return (
//     <div>CatalogEdit</div>
//   )
// }

// export default CatalogEdit