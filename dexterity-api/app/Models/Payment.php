namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $table = 'payments'; // Ensure this matches your Supabase payments table name

    protected $fillable = [
        'user_id',
        'amount_paid',
        'currency',
        'status',
    ];
}
