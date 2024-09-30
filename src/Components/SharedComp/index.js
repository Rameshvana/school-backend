import { Link } from "react-router-dom"
import { CiSearch } from "react-icons/ci";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdMode,MdPictureAsPdf,MdDelete } from "react-icons/md";


function SharedComponent(props) {
  const { data, headers } = props;
  console.log(data);

  return (
    <table class="table table-hover">
      <thead className="bg-dry">
        <tr>
          {" "}
          {headers.map((head) => (
            <th>{head}</th>
          ))}{" "}
        </tr>
      </thead>
      <tbody>
        {data.map((each, index) => (
          <tr>
            <th scope="row">{"#"}</th>
            <td></td>
            <td>{each.email}</td>
            <td>{each.phoneNo}</td>
            <td>{each.status}</td>
            <td>{each.registation_date}</td>
            <td>
              {/* <button className='btn btn-success'>Edit</button> &nbsp;
                         <button className='btn btn-danger'>Delete</button> 
                         <a href='#' onClick={() => {}} ><MdMode className='bomma'/> </a> */}
              <Link title="Update">
                <MdMode className="update-icon" />
              </Link>
              <Link title="Delete">
                <RiDeleteBinFill className="delete-icon" />{" "}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SharedComponent;